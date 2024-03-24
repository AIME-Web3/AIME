import { atom } from "recoil";


export const createStepAtom = atom({
    key: 'createState',
    default: 0
});

export const globalImageAtom = atom({
    key: "globalImage",
    default: "image"
})