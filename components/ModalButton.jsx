"use client";

export default function ModalButton({btnFn}) {
    return (
        <button type={"button"} onClick={() => btnFn}>Press</button>
    )
}