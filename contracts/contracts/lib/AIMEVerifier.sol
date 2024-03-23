// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.20;
import "../interface/IVerifier.sol";

contract AIMEVerifier is IVerifier {
    function verifyProof(bytes calldata proof, bytes[2] calldata inputs) external view returns (bool) {
        return true;
    }
}