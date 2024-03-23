// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "./interface/IERC7007.sol";
import "./interface/IVerifier.sol";

contract AIME is IERC7007, ERC721 {
    IVerifier public verifierContract;
    mapping(uint256 tokenId => bytes16 metadata) public tokenIdMetadata;
    uint256 currentTokenId = 1;

    mapping(uint256 => string) private tokenURIMap;

    constructor(IVerifier _verifierContract) ERC721("AIME", "AIME") {
        verifierContract = _verifierContract;
    }

    function safeMint(address to, uint256 tokenId) public {
        _safeMint(to, tokenId);
    }

    function mint(
        bytes calldata prompt,
        bytes calldata aigcData,
        string calldata uri,
        bytes calldata proof
    )
        external
        returns (
            // requireRegistry
            uint256
        )
    {
        address to = msg.sender;
        // require(verify(prompt, aigcData, proof), "incorrrect proof");
        uint256 targetId = currentTokenId;
        currentTokenId++;
        safeMint(msg.sender, targetId);
        tokenIdMetadata[targetId] = bytes16(aigcData);
        tokenURIMap[targetId] = uri;

        emit Mint(to, targetId, prompt, aigcData, uri, proof);
        return targetId;
    }

    function verify(
        bytes calldata prompt,
        bytes calldata aigcData,
        bytes calldata proof
    ) public view returns (bool success) {
      bytes[2] memory _inputs = [prompt, aigcData];      
      return verifierContract.verifyProof(proof, _inputs);
    }

    function getMetadata(uint256 tokenId) public view returns (bytes16) {
        return tokenIdMetadata[tokenId];
    }

    function masterMint(bytes calldata aigcData) public returns (uint256) {
        address to = msg.sender;
        uint256 tokenIdNow = currentTokenId;
        currentTokenId++;
        safeMint(to, tokenIdNow);
        tokenIdMetadata[tokenIdNow] = bytes16(aigcData);

        bytes memory fakePrompt = "fake";
        emit Mint(to, tokenIdNow, fakePrompt, aigcData, "", fakePrompt);
        return tokenIdNow;
    }

    function mint(
        address to,
        bytes calldata prompt,
        bytes calldata aigcData,
        string calldata uri,
        bytes calldata proof
    ) external override returns (uint256 tokenId) {}

    function _exists(uint256 tokenId) internal view virtual returns (bool result) {
        if (tokenId >= currentTokenId) {
            return false;
        }
        return true;
    }
    /**
     * @dev Returns the Uniform Resource Identifier (URI) for `tokenId` token.
     */
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        return tokenURIMap[tokenId];
        // string memory baseURI = _baseURI();
        // return bytes(baseURI).length != 0 ? string(abi.encodePacked(baseURI, _toString(tokenId))) : '';
    }

    /**
     * @dev Converts a uint256 to its ASCII string decimal representation.
     */
    function _toString(uint256 value) internal pure virtual returns (string memory str) {
        assembly {
            // The maximum value of a uint256 contains 78 digits (1 byte per digit), but
            // we allocate 0xa0 bytes to keep the free memory pointer 32-byte word aligned.
            // We will need 1 word for the trailing zeros padding, 1 word for the length,
            // and 3 words for a maximum of 78 digits. Total: 5 * 0x20 = 0xa0.
            let m := add(mload(0x40), 0xa0)
            // Update the free memory pointer to allocate.
            mstore(0x40, m)
            // Assign the `str` to the end.
            str := sub(m, 0x20)
            // Zeroize the slot after the string.
            mstore(str, 0)

            // Cache the end of the memory to calculate the length later.
            let end := str

            // We write the string from rightmost digit to leftmost digit.
            // The following is essentially a do-while loop that also handles the zero case.
            // prettier-ignore
            for { let temp := value } 1 {} {
                str := sub(str, 1)
                // Write the character to the pointer.
                // The ASCII index of the '0' character is 48.
                mstore8(str, add(48, mod(temp, 10)))
                // Keep dividing `temp` until zero.
                temp := div(temp, 10)
                // prettier-ignore
                if iszero(temp) { break }
            }

            let length := sub(end, str)
            // Move the pointer 32 bytes leftwards to make room for the length.
            str := sub(str, 0x20)
            // Store the length.
            mstore(str, length)
        }
    }
}