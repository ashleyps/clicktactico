import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import classNames from 'classnames';

const NavLink = ({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) => (
    <a
        href={href}
        onClick={onClick}
        className="relative font-mono text-sm tracking-wider text-[var(--color-hud-text)] hover:text-white transition-colors duration-200 group"
    >
        <span className="relative z-10">{children}</span>
        <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[var(--color-laser-red)] transition-all duration-300 group-hover:w-full"></span>
    </a>
);

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const menuItems = [
        { label: 'PROBLEMA', href: '#problem' },
        { label: 'SOLUCIÓN', href: '#solution' },
        { label: 'CASOS', href: '#cases' }, // Future placeholder
        { label: 'CONTACTO', href: '#contact' },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4 md:px-8 bg-[var(--color-void)]/80 backdrop-blur-md border-b border-[var(--color-hud-gray)]/30">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                {/* Logo */}
                <div className="flex items-center gap-4">
                    <img
                        src="/clicktactico-logo-white-horizontal.svg"
                        alt="Click Táctico"
                        className="h-8 md:h-10 w-auto object-contain"
                    />
                    {/* Live Indicator (Hidden on small mobile) */}
                    <div className="hidden sm:flex items-center gap-2 text-[10px] font-mono text-[var(--color-hud-text)] opacity-70 border-l border-[var(--color-hud-gray)] pl-4">
                        <span className="animate-pulse text-[var(--color-laser-red)]">●</span> SYSTEM ONLINE
                    </div>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    {menuItems.map((item) => (
                        <NavLink key={item.label} href={item.href}>
                            {item.label}
                        </NavLink>
                    ))}
                    <button className="px-4 py-2 text-xs font-bold bg-[var(--color-laser-red)] text-white hover:bg-red-600 transition-colors uppercase tracking-widest clip-path-button">
                        ACCESO CLIENTES
                    </button>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden text-white"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden overflow-hidden bg-[var(--color-void)] border-b border-[var(--color-hud-gray)]"
                    >
                        <div className="flex flex-col p-4 gap-4">
                            {menuItems.map((item) => (
                                <NavLink
                                    key={item.label}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.label}
                                </NavLink>
                            ))}
                            <button className="w-full py-3 mt-2 text-xs font-bold bg-[var(--color-laser-red)] text-white uppercase tracking-widest">
                                ACCESO CLIENTES
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};
