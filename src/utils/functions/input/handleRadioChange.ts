import { ChangeEvent } from "react";

export const handleRadioChange = (setter: (value: number) => void) => (e: ChangeEvent<HTMLInputElement>) => setter(Number(e.target.value))