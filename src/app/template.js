"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function Template({ children }) {
    const prefersReducedMotion = useReducedMotion();

    return (
        <>
            {!prefersReducedMotion && (
                <motion.div
                    aria-hidden="true"
                    className="route-curtain"
                    initial={{ scaleY: 1 }}
                    animate={{ scaleY: 0 }}
                    transition={{ duration: 0.64, ease: [0.76, 0, 0.24, 1] }}
                />
            )}
            <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.45, delay: prefersReducedMotion ? 0 : 0.18 }}
            >
                {children}
            </motion.div>
        </>
    );
}
