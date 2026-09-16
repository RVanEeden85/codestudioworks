export default function ProcessDrawing({ stage }) {
    return (
        <svg className="process-drawing" viewBox="0 0 260 180" fill="none" aria-hidden="true">
            <path className="drawing-guides" d="M20 140 130 78 240 140M130 18V164M20 150H240M30 35H230" />
            <g className="drawing-model">
                <path className="drawing-base" d="m35 126 95-52 95 52-95 52Z" />
                {stage === 0 ? <>
                    <path className="drawing-line" d="m57 116 73-40 72 40-72 40Zm0-22 73-40 72 40M57 94v22m145-22v22M130 54v22" strokeDasharray="5 5" />
                    <circle cx="130" cy="54" r="5" className="drawing-node" />
                    <circle cx="57" cy="116" r="4" className="drawing-node" />
                    <circle cx="202" cy="116" r="4" className="drawing-node" />
                </> : <>
                    <path className="drawing-side" d="M57 116V63l73 40v53Z" />
                    <path className="drawing-front" d="M130 156v-53l72-40v53Z" />
                    <path className="drawing-roof" d="m57 63 73-40 72 40-72 40Z" />
                    <path className="drawing-line" d="M81 77v52m25-39v53m48-54v53m24-67v54" />
                    {stage === 1 && <path className="drawing-measure" d="M42 60v59m-5-59h10m-10 59h10M62 45l64-35m-66 31 4 8m60-43 4 8" />}
                    {stage === 2 && <path className="drawing-accent" d="m57 45 73-40 72 40-72 40Z" />}
                    {stage === 3 && <>
                        <path className="drawing-door" d="M151 144v-31l26-14v31" />
                        <path className="drawing-accent" d="m72 69 45 25M143 97l47-26" />
                        <circle cx="213" cy="38" r="17" className="drawing-node" />
                        <path d="m205 38 6 6 10-12" stroke="#17251f" strokeWidth="2.5" />
                    </>}
                </>}
            </g>
        </svg>
    );
}
