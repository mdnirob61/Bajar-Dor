
import React from "react";

const Footer = () => {
    return (
        <footer className="px-4 py-5 sm:px-6">
            <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 text-center text-xs font-semibold leading-relaxed text-slate-800 sm:flex-row sm:justify-between sm:gap-4 sm:text-left sm:text-sm">
                <p>
                    বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
                </p>

                <p className="text-slate-800">
                    সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
                </p>
            </div>
        </footer>
    );
};

export default Footer;
