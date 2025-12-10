"use client";

const CopyrightBar = () => {
    const year = new Date().getFullYear();

    return (
        <div className="min-h-18 px-5 w-full bg-black text-white text-sm flex items-center justify-center ">
            <span className="text-center">
                © {year} All rights reserved. <br /> Created by{" "}
                <a
                    href="https://www.codestudioworks.com"
                    className="hover:text-blue-300 hover:tracking-widest transition-all duration-500"
                    target="_blank"
                >
                    CodeStudioWorks.com
                </a>{" "}
            </span>
        </div>
    );
};

export default CopyrightBar;
