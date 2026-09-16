export default function PlanningDesk() {
    return <div className="planning-desk" aria-hidden="true">
        <div className="planning-desk-surface">
            <div className="planning-paper planning-paper-back" />
            <div className="planning-paper">
                <span>CSW / PROJECT PLAN</span>
                <svg viewBox="0 0 240 200" fill="none">
                    <g stroke="#657567" strokeWidth="1.5">
                        <path d="M25 25h190v150H25ZM25 62h190M95 62v113M95 122h120" />
                        <path d="M37 38h60M37 47h30M110 78h86v29h-86ZM110 137h35v23h-35Zm49 0h35v23h-35Z" />
                        <path d="M12 25v150M8 25h8M8 175h8M25 188h190M25 184v8m190-8v8" />
                    </g>
                </svg>
                <span>STRUCTURE / CONTENT / CUSTOMER JOURNEY</span>
            </div>
            <div className="planning-tablet">
                <div className="planning-screen">
                    <div className="planning-screen-top"><b>CSW</b><span>YOUR NEXT CHAPTER</span></div>
                    <div className="planning-screen-title">An idea.<br />A clear plan.<br /><em>A place online.</em></div>
                    <div className="planning-screen-button">LET’S BUILD IT ↗</div>
                    <div className="planning-wireframe"><i /><i /><i /></div>
                    <div className="planning-screen-footer">DESIGNED AROUND YOUR BUSINESS</div>
                </div>
            </div>
            <div className="planning-pencil" />
        </div>
        <div className="planning-caption"><span>THE PLANNING DESK</span><span>CSW / STUDIO 01</span></div>
    </div>;
}
