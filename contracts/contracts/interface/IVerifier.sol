// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

interface IVerifier {
    function verifyProof(
        bytes memory proof,
        bytes[2] memory public_inputs
    ) external view returns (bool valid);
}