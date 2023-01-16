import React from "react";

export function Container({
	children,
	className="",
}: { children: React.ReactNode; className?: string }) {
	return(

        <div className={`m-auto max-w-xl bg-slate-200 ${className}`}>
            {children}
        </div>

    );
}
