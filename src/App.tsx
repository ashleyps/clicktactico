import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Target, Users, Zap, ShieldCheck, Activity, BarChart3, Lock } from 'lucide-react';
import { Navbar } from './components/Navbar';
import classNames from 'classnames';

// --- UI COMPONENTS ---
const TacticalButton = ({ children, className, fullWidth = false }: { children: React.ReactNode, className?: string, fullWidth?: boolean }) => (
  <button className={classNames("btn-tactical", fullWidth && "w-full", className)}>
    <span className="flex items-center justify-center gap-2 relative z-10">
      {children}
    </span>
  </button>
);

const HudCard = ({ children, title, className, delay = 0 }: { children: React.ReactNode, title?: string, className?: string, delay?: number }) => (
  <motion.div
    className={classNames("hud-panel hud-corners p-6", className)}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.4 }}
    viewport={{ once: true }}
  >
    {title && (
      <div className="absolute -top-3 left-4 bg-[var(--color-void)] px-2 text-[var(--color-laser-red)] text-xs font-mono tracking-widest uppercase border border-[var(--color-hud-gray)]">
        {title}
      </div>
    )}
    {children}
  </motion.div>
);

const SectionTitle = ({ title, subtitle }: { title: string, subtitle?: string }) => (
  <div className="mb-12 md:mb-20">
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="flex items-center gap-4 mb-4"
    >
      <span className="h-[1px] w-12 bg-[var(--color-laser-red)]"></span>
      <span className="text-[var(--color-laser-red)] font-mono text-sm tracking-widest">SYSTEM: ALERT</span>
    </motion.div>
    <h2 className="text-3xl md:text-5xl font-bold uppercase leading-tight mb-4">{title}</h2>
    {subtitle && <p className="text-[var(--color-hud-text)] text-lg md:text-xl max-w-2xl font-light">{subtitle}</p>}
  </div>
);


function App() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <div className="min-h-screen bg-[var(--color-void)] selection:bg-[var(--color-laser-red)] selection:text-white pb-20 overflow-x-hidden">
      {/* Background Effects */}
      <div className="bg-grid-pattern fixed inset-0 z-0"></div>
      <div className="scanlines fixed inset-0 z-50 pointer-events-none"></div>

      <Navbar />

      {/* --- HERO SECTION --- */}
      <section className="relative z-10 min-h-screen flex flex-col justify-center items-center px-4 pt-32 md:pt-40">
        <div className="max-w-6xl w-full mx-auto relative">

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mt-12 md:mt-0"
          >
            <h1 className="text-4xl md:text-7xl lg:text-8xl font-bold uppercase mb-6 leading-[0.9] tracking-tighter">
              Deja de perseguir <br />
              <span className="text-stroke text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">a Curiosos</span>
            </h1>

            <p className="text-lg md:text-2xl text-[var(--color-hud-text)] max-w-3xl mx-auto mb-10 leading-relaxed font-light">
              Instalamos un <strong className="text-white">Sistema de Filtrado con IA</strong> que llena la agenda de tu equipo comercial solo con prospectos calificados.
            </p>

            {/* Bullet Points */}
            <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-12 font-mono text-sm md:text-base text-white/80">
              <span className="flex items-center gap-2"><span className="text-[var(--color-laser-red)]">✗</span> SIN LEADS FRÍOS</span>
              <span className="flex items-center gap-2"><span className="text-[var(--color-laser-red)]">✗</span> SIN PERSEGUIR</span>
              <span className="flex items-center gap-2"><span className="text-green-500">✓</span> SOLO FILTRADOS</span>
            </div>

            <div className="flex justify-center">
              <TacticalButton className="text-lg md:text-xl px-12 py-6">
                [ CONSTRUIR MI FILTRO ]
              </TacticalButton>
            </div>
            <p className="mt-4 text-xs font-mono text-[var(--color-hud-text)]">
              // ANÁLISIS GRATUITO DE TU PROCESO ACTUAL
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- PROBLEM SECTION (The "Volume Trap") --- */}
      <section id="problem" className="relative z-10 py-24 md:py-32 px-4 border-t border-[var(--color-hud-gray)] bg-[var(--color-void)]">
        <div className="max-w-6xl mx-auto">
          <SectionTitle
            title="La 'Trampa del Volumen'"
            subtitle="Por qué más leads (basura) te están haciendo perder dinero."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <HudCard title="ERROR DETECTADO: 01" delay={0.1}>
              <Users className="text-[var(--color-laser-red)] mb-6" size={48} strokeWidth={1} />
              <h3 className="text-xl mb-4">Tráfico sin Filtro</h3>
              <p className="text-[var(--color-hud-text)]">Pagas anuncios para que todo el mundo te vea. Tu puerta de entrada está rota y dejas pasar a cualquiera.</p>
            </HudCard>

            <HudCard title="ERROR DETECTADO: 02" delay={0.2}>
              <Activity className="text-[var(--color-laser-red)] mb-6" size={48} strokeWidth={1} />
              <h3 className="text-xl mb-4">Desperdicio Operativo</h3>
              <p className="text-[var(--color-hud-text)]">Tu equipo pierde 20 horas/semana respondiendo a gente sin dinero. Los "likes" no pagan facturas.</p>
            </HudCard>

            <HudCard title="ERROR DETECTADO: 03" delay={0.3}>
              <ShieldCheck className="text-[var(--color-laser-red)] mb-6 opacity-50" size={48} strokeWidth={1} />
              <h3 className="text-xl mb-4">Fuga de Ballenas</h3>
              <p className="text-[var(--color-hud-text)]">Los prospectos reales se cansan de esperar en la fila y se van con tu competencia más ágil.</p>
            </HudCard>
          </div>
        </div>
      </section>


      {/* --- SOLUTION SECTION (The Mechanism) --- */}
      <section id="solution" className="relative z-10 py-24 px-4 bg-[var(--color-void-dark)] overflow-hidden">
        <div className="max-w-6xl mx-auto relative">
          <SectionTitle title="Protocolo Smart Quiz" />

          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12 mt-20">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-0 w-full h-[2px] bg-[var(--color-hud-gray)] -z-10"></div>

            {/* Steps */}
            {[
              { title: "GANCHO EDUCATIVO", desc: "El prospecto no siente que le vendes. Siente que le ayudas con un diagnóstico.", icon: Zap },
              { title: "LEAD SCORING IA", desc: "Nuestra IA analiza: Presupuesto, Urgencia y Dolor en tiempo real.", icon: BarChart3 },
              { title: "BIFURCACIÓN", desc: "Curiosos -> Nurturing. Compradores -> Agenda directa.", icon: Target }
            ].map((step, i) => (
              <div key={i} className="relative bg-[var(--color-void-dark)] pt-8">
                <div className="w-24 h-24 mx-auto bg-[var(--color-void)] border border-[var(--color-hud-gray)] flex items-center justify-center rounded-full mb-6 relative">
                  <step.icon className="text-white" size={32} />
                  <div className="absolute inset-0 border border-[var(--color-laser-red)] rounded-full animate-ping opacity-20"></div>
                </div>
                <h3 className="text-center text-xl mb-2">{step.title}</h3>
                <p className="text-center text-[var(--color-hud-text)] text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- DEMO SECTION (Notification) --- */}
      <section id="cases" className="relative z-10 py-32 px-4" ref={targetRef}>
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <h2 className="text-4xl font-bold mb-6">No recibes "Datos". <br />Recibes <span className="text-[var(--color-laser-red)]">INTELIGENCIA.</span></h2>
            <p className="text-[var(--color-hud-text)] text-lg mb-8">Imagina que tu equipo recibiera ESTO cada mañana en lugar de una lista de teléfonos fantasma.</p>
            <ul className="space-y-4 font-mono text-sm text-[var(--color-hud-text)]">
              <li className="flex items-center gap-3"><span className="w-2 h-2 bg-[var(--color-laser-red)]"></span> SCORE DE CALIDAD &gt; 90</li>
              <li className="flex items-center gap-3"><span className="w-2 h-2 bg-[var(--color-laser-red)]"></span> INTENCIÓN DE COMPRA: ALTA</li>
            </ul>
          </div>

          <div className="flex-1 w-full">
            <motion.div
              style={{ opacity }}
              className="bg-[#1a1b22] border-l-4 border-[var(--color-laser-red)] p-6 shadow-[0_0_50px_rgba(0,0,0,0.5)] rounded-r-lg relative overflow-hidden"
            >
              <div className="flex justify-between items-start mb-6 border-b border-white/5 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-900/30 rounded flex items-center justify-center text-green-500">
                    <Target size={20} />
                  </div>
                  <div>
                    <div className="font-bold">NUEVA OPORTUNIDAD</div>
                    <div className="text-xs text-[var(--color-hud-text)]">Hace 2 minutos</div>
                  </div>
                </div>
                <div className="px-2 py-1 bg-[var(--color-laser-red)] text-white text-xs font-bold rounded">HOT LEAD 🔥</div>
              </div>

              <div className="space-y-3 font-mono text-sm">
                <div className="flex justify-between"><span className="text-[var(--color-hud-text)]">Nombre:</span> <span>Carlos R.</span></div>
                <div className="flex justify-between"><span className="text-[var(--color-hud-text)]">Score:</span> <span className="text-green-400">95/100</span></div>
                <div className="flex justify-between"><span className="text-[var(--color-hud-text)]">Presupuesto:</span> <span>Alto ($2,000+)</span></div>
                <div className="flex justify-between"><span className="text-[var(--color-hud-text)]">Urgencia:</span> <span>Inmediata</span></div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5">
                <button className="w-full py-2 bg-white/5 hover:bg-white/10 text-xs font-mono uppercase tracking-wider text-center transition-colors">
                  Ver Ficha Completa
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- SECTORS & OFFER --- */}
      <section id="contact" className="relative z-10 py-24 px-4 bg-[var(--color-void-dark)] border-t border-[var(--color-hud-gray)]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">SECTORES COMPATIBLES</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-sm text-[var(--color-hud-text)]">
            <div className="p-4 border border-[var(--color-hud-gray)] hover:border-[var(--color-laser-red)] transition-colors cursor-crosshair">SALUD & ESTÉTICA</div>
            <div className="p-4 border border-[var(--color-hud-gray)] hover:border-[var(--color-laser-red)] transition-colors cursor-crosshair">HOME SERVICES</div>
            <div className="p-4 border border-[var(--color-hud-gray)] hover:border-[var(--color-laser-red)] transition-colors cursor-crosshair">HIGH TICKET COACHING</div>
            <div className="p-4 border border-[var(--color-hud-gray)] hover:border-[var(--color-laser-red)] transition-colors cursor-crosshair">REAL ESTATE</div>
          </div>

          <div className="mt-32 p-1 bg-gradient-to-r from-transparent via-[var(--color-laser-red)] to-transparent opacity-20 h-[1px] w-full"></div>

          <div className="mt-20">
            <h2 className="text-5xl md:text-6xl mb-8">TU SISTEMA EN <span className="text-[var(--color-laser-red)]">30 DÍAS</span></h2>
            <p className="text-xl text-[var(--color-hud-text)] mb-12 max-w-2xl mx-auto">
              Si tienes una oferta validada y presupuesto, nosotros ponemos el motor.
            </p>
            <TacticalButton fullWidth className="max-w-md mx-auto text-xl py-6">
              QUIERO MI AUDITORÍA DE VENTAS
            </TacticalButton>
            <p className="mt-6 text-sm text-[var(--color-hud-text)] opacity-60">Plazas limitadas por capacidad operativa.</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 py-12 px-4 border-t border-[var(--color-hud-gray)] text-center text-[var(--color-hud-text)] font-mono text-xs">
        <div className="flex justify-center items-center gap-2 mb-4">
          <Lock size={14} />
          <span>SECURE CONNECTION ESTABLISHED</span>
        </div>
        <p>&copy; 2025 CLICK TÁCTICO. SYSTEM OPERATIONS NORMAL.</p>
      </footer>
    </div>
  );
}

export default App;
