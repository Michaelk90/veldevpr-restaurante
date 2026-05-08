import { useEffect, useMemo, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowUpRight,
  Calendar,
  ChevronRight,
  Clock,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Star,
  Users,
  Utensils,
  Wine,
  X,
} from "lucide-react";
import "./App.css";

const PHONE_RAW = "+17875281627";
const PHONE_DISPLAY = "(787) 528-1627";
const WHATSAPP_NUMBER = "17875281627";
const WHATSAPP = `https://wa.me/${WHATSAPP_NUMBER}`;
const ADDRESS = "Ave. Conquistador #12, Fajardo, PR";
const CHEF_NAME = "Michael Velázquez Figueroa";

const NAV_LINKS = [
  { label: "Casa", href: "#inicio" },
  { label: "Filosofía", href: "#filosofia" },
  { label: "Carta", href: "#carta" },
  { label: "Galería", href: "#galeria" },
  { label: "Reservar", href: "#reservar" },
  { label: "Visítanos", href: "#visitanos" },
];

type MenuItem = {
  name: string;
  description: string;
  price: number;
  image: string;
  tag?: string;
};

type MenuSection = {
  id: string;
  label: string;
  subtitle: string;
  items: MenuItem[];
};

const MENU_SECTIONS: MenuSection[] = [
  {
    id: "entrantes",
    label: "Entrantes",
    subtitle: "Para empezar la conversación.",
    items: [
      {
        name: "Sorullito de maíz blanco",
        description:
          "Maíz tierno, queso del país y alioli de annato sobre hoja de plátano tostada.",
        price: 16,
        image:
          "https://images.unsplash.com/photo-1626804475297-41608ea09aeb?w=400&q=80&auto=format&fit=crop",
      },
      {
        name: "Carpaccio de chillo",
        description:
          "Pesca del día, aceite de oliva extra virgen, sal marina y reducción de naranja agria.",
        price: 22,
        image:
          "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&q=80&auto=format&fit=crop",
      },
      {
        name: "Tartar de atún rojo",
        description:
          "Aguacate criollo, almendra tostada, ralladura de granadilla y crujiente de yuca.",
        price: 26,
        tag: "Recomendado",
        image:
          "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80&auto=format&fit=crop",
      },
      {
        name: "Consomé de chicharrón",
        description:
          "Caldo claro de cerdo curado en casa, hojaldre tibio de pan sobao y aceite de culantro.",
        price: 18,
        image:
          "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&q=80&auto=format&fit=crop",
      },
    ],
  },
  {
    id: "platos",
    label: "Platos principales",
    subtitle: "El corazón de la mesa.",
    items: [
      {
        name: "Mofongo de langosta del Caribe",
        description:
          "Langosta local, salsa criolla evolucionada, ajíes dulces del huerto y aceite de cilantrillo.",
        price: 48,
        tag: "Signature",
        image:
          "https://images.unsplash.com/photo-1559847844-5315695dadae?w=400&q=80&auto=format&fit=crop",
      },
      {
        name: "Lechón cocinado 12 horas",
        description:
          "Asado a baja temperatura, mole de café boricua, manzana asada y crujiente de cuero.",
        price: 42,
        image:
          "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=80&auto=format&fit=crop",
      },
      {
        name: "Chillo entero a la sal",
        description:
          "Pesca diaria al horno bajo costra de sal marina, mojo isleño y viandas glaseadas.",
        price: 56,
        image:
          "https://images.unsplash.com/photo-1485921325833-c519f76c4927?w=400&q=80&auto=format&fit=crop",
      },
      {
        name: "Risotto de gandules",
        description:
          "Arroz arborio, caldo de viandas, parmesano añejo y mascarpone de queso del país.",
        price: 34,
        image:
          "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&q=80&auto=format&fit=crop",
      },
      {
        name: "Filete dry-aged 30 días",
        description:
          "Lomo madurado, papa cremosa, espinaca trufada y demi-glace de café Yauco.",
        price: 62,
        image:
          "https://images.unsplash.com/photo-1546964124-0cce460f38ef?w=400&q=80&auto=format&fit=crop",
      },
    ],
  },
  {
    id: "postres",
    label: "Postres",
    subtitle: "Para cerrar con calma.",
    items: [
      {
        name: "Tembleque deconstruido",
        description:
          "Crema fría de coco, vainilla isleña, gel de parcha y polvo de canela.",
        price: 14,
        image:
          "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&q=80&auto=format&fit=crop",
      },
      {
        name: "Sorbete de china valencia",
        description:
          "Naranja de la finca, hierba luisa fresca y espuma de champagne brut.",
        price: 13,
        image:
          "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=400&q=80&auto=format&fit=crop",
      },
      {
        name: "Helado de quesito",
        description:
          "Queso del país en helado, miel de caña, almendra activada y galleta de maicena.",
        price: 14,
        image:
          "https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?w=400&q=80&auto=format&fit=crop",
      },
    ],
  },
];

const TASTING_MENUS = [
  {
    title: "Cinco tiempos",
    description:
      "Una introducción a la cocina del chef. Entrante, dos platos, sorbete y postre.",
    price: 95,
    pairing: 145,
    featured: false,
  },
  {
    title: "Siete tiempos",
    description:
      "La experiencia completa. Tres entrantes, dos platos, transición y dos postres.",
    price: 135,
    pairing: 205,
    featured: true,
  },
];

const PHILOSOPHY = [
  {
    icon: Utensils,
    title: "Producto isleño.",
    body:
      "Trabajamos con pescadores de Fajardo, agricultores de la montaña y productores de queso del país. Lo que servimos hoy se cosechó esta semana.",
  },
  {
    icon: Wine,
    title: "Técnica clásica.",
    body:
      "Escuela francesa, mano caribeña. Cada salsa, cada caldo y cada masa pasa por el rigor de la cocina clásica antes de llegar al plato.",
  },
  {
    icon: Star,
    title: "Mesa cuidada.",
    body:
      "Servicio sin afectación, ritmo pensado, copas atendidas. Te tratamos como tratamos a la abuela cuando viene de visita.",
  },
];

const GALLERY = [
  {
    src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=85&auto=format&fit=crop",
    alt: "Mesa con copas y vajilla cuidada",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=700&q=85&auto=format&fit=crop",
    alt: "Plato emplatado del chef",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=700&q=85&auto=format&fit=crop",
    alt: "Interior del comedor",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=900&q=85&auto=format&fit=crop",
    alt: "Chef terminando un plato",
    span: "md:col-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=700&q=85&auto=format&fit=crop",
    alt: "Detalle de plato",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=700&q=85&auto=format&fit=crop",
    alt: "Copa de vino tinto",
    span: "",
  },
];

const SCHEDULE = [
  { day: "Lunes", hours: "Cerrado", closed: true },
  { day: "Martes", hours: "5:30 PM — 10:00 PM", closed: false },
  { day: "Miércoles", hours: "5:30 PM — 10:00 PM", closed: false },
  { day: "Jueves", hours: "5:30 PM — 10:30 PM", closed: false },
  { day: "Viernes", hours: "5:30 PM — 11:00 PM", closed: false },
  { day: "Sábado", hours: "12:00 PM — 11:00 PM", closed: false },
  { day: "Domingo", hours: "12:00 PM — 9:00 PM", closed: false },
];

const STATS = [
  { value: "8+", label: "Años cocinando" },
  { value: "4.7", label: "Rating en Google" },
  { value: "300+", label: "Reseñas reales" },
  { value: "12", label: "Productores locales" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
};

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-noir/75 backdrop-blur-xl border-b border-noir-line/70"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-10 md:py-5">
        <a
          href="#inicio"
          className="flex items-baseline gap-1 font-display text-2xl tracking-tight text-cream md:text-[28px]"
        >
          <span className="italic">La</span>
          <span className="font-medium">Isla</span>
          <span className="ml-1 inline-block h-1.5 w-1.5 rounded-full bg-champagne" />
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-[13px] uppercase tracking-[0.18em] text-cream/75 transition-colors hover:text-champagne"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#reservar"
          className="hidden items-center gap-2 rounded-full border border-champagne/50 bg-champagne/10 px-5 py-2.5 text-xs font-medium uppercase tracking-[0.18em] text-champagne transition-all hover:bg-champagne hover:text-noir md:inline-flex"
        >
          Reservar
          <ChevronRight className="h-4 w-4" />
        </a>

        <button
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          className="grid h-11 w-11 place-items-center rounded-full border border-noir-line/80 bg-noir-soft/80 text-cream backdrop-blur md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        className="overflow-hidden border-t border-noir-line/60 bg-noir/95 backdrop-blur-xl md:hidden"
      >
        <ul className="flex flex-col gap-1 px-5 py-4">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-3 text-base text-cream/90 hover:bg-noir-line/50"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li className="mt-2 px-1">
            <a
              href="#reservar"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 rounded-full bg-champagne px-5 py-3 text-xs font-medium uppercase tracking-wider text-noir"
            >
              Reservar mesa
              <ChevronRight className="h-4 w-4" />
            </a>
          </li>
        </ul>
      </motion.div>
    </header>
  );
}

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mql = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);
  return isDesktop;
}

function Hero() {
  const { scrollY } = useScroll();
  const yImg = useTransform(scrollY, [0, 600], [0, -60]);
  const yText = useTransform(scrollY, [0, 600], [0, 40]);
  const isDesktop = useIsDesktop();

  return (
    <section
      id="inicio"
      className="relative min-h-[110vh] overflow-hidden pt-32 md:min-h-screen md:pt-40"
    >
      <div className="absolute inset-0 -z-10 animate-pan bg-[radial-gradient(circle_at_15%_20%,rgba(212,175,111,0.18),transparent_55%),radial-gradient(circle_at_85%_70%,rgba(140,74,58,0.18),transparent_55%)]" />

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 md:px-10 lg:grid-cols-12 lg:gap-10">
        <motion.div
          style={isDesktop ? { y: yText } : undefined}
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="relative lg:col-span-7"
        >
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="mb-8 inline-flex items-center gap-3 rounded-full border border-champagne/40 bg-champagne/5 px-4 py-1.5"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-champagne" />
            <span className="text-[11px] uppercase tracking-[0.28em] text-champagne">
              Fine Dining · Fajardo, PR
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.8 }}
            className="font-display text-[64px] font-medium leading-[0.95] tracking-tight text-cream sm:text-[84px] md:text-[112px] lg:text-[128px]"
          >
            La isla,
            <br />
            <span className="italic font-normal text-champagne">a tu mesa.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.7 }}
            className="mt-8 max-w-md text-lg leading-relaxed text-cream/70 md:text-xl"
          >
            Cocina contemporánea con producto puertorriqueño. Tasting menu
            cuidado en pocas mesas, escrito por temporada y servido sin prisa.
          </motion.p>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.7 }}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
          >
            <a
              href="#reservar"
              className="group inline-flex min-h-[54px] items-center justify-center gap-2 rounded-full bg-champagne px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.22em] text-noir transition-all hover:bg-cream hover:shadow-[0_0_50px_var(--color-champagne-glow)]"
            >
              Reservar mesa
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="#carta"
              className="inline-flex min-h-[54px] items-center justify-center gap-2 rounded-full border border-cream/25 px-7 py-3.5 text-xs font-medium uppercase tracking-[0.22em] text-cream transition-all hover:border-cream hover:bg-cream/5"
            >
              Ver la carta
            </a>
          </motion.div>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-16 grid grid-cols-2 gap-6 border-t border-noir-line/70 pt-8 md:grid-cols-4 md:gap-10"
          >
            {STATS.map((s) => (
              <div key={s.label}>
                <div className="font-display text-3xl text-champagne md:text-4xl">
                  {s.value}
                </div>
                <div className="mt-2 text-[10px] uppercase tracking-[0.22em] text-cream/55 md:text-xs">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          style={isDesktop ? { y: yImg } : undefined}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative lg:col-span-5"
        >
          <div className="relative aspect-[3/4] overflow-hidden rounded-[28px] border border-noir-line/70 bg-noir-soft md:aspect-[4/5] lg:aspect-[3/4]">
            <img
              src="https://images.unsplash.com/photo-1559847844-5315695dadae?w=900&q=90&auto=format&fit=crop"
              alt="Mofongo de langosta — plato signature de La Isla"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-noir/70 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-3">
              <div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-champagne">
                  Plato signature
                </div>
                <div className="mt-1 font-display text-2xl text-cream md:text-3xl">
                  Mofongo de langosta
                </div>
              </div>
              <a
                href="#carta"
                aria-label="Ir a la carta"
                className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-cream/30 bg-noir/40 text-cream backdrop-blur transition-all hover:border-champagne hover:text-champagne"
              >
                <ArrowUpRight className="h-5 w-5" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
}: {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
  align?: "left" | "center";
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={stagger}
      className={`mb-16 max-w-2xl md:mb-24 ${
        align === "center" ? "mx-auto text-center" : ""
      }`}
    >
      <motion.div
        variants={fadeUp}
        transition={{ duration: 0.6 }}
        className="mb-5 inline-flex items-center gap-3"
      >
        <span className="h-px w-10 bg-champagne" />
        <span className="text-[10px] uppercase tracking-[0.3em] text-champagne">
          {eyebrow}
        </span>
      </motion.div>
      <motion.h2
        variants={fadeUp}
        transition={{ duration: 0.7 }}
        className="font-display text-4xl leading-[1.05] tracking-tight text-cream sm:text-5xl md:text-6xl lg:text-7xl"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          variants={fadeUp}
          transition={{ duration: 0.7 }}
          className="mt-6 max-w-xl text-base leading-relaxed text-cream/65 md:text-lg"
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}

function Filosofia() {
  return (
    <section
      id="filosofia"
      className="relative overflow-hidden bg-noir-soft py-24 md:py-36"
    >
      <div className="absolute inset-0 -z-0 opacity-30">
        <div className="absolute -left-40 top-1/3 h-[480px] w-[480px] rounded-full bg-champagne/15 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <SectionHeading
          eyebrow="Filosofía"
          title={
            <>
              Cocina del lugar,
              <br />
              <span className="italic font-normal text-champagne">
                con el rigor del oficio.
              </span>
            </>
          }
          subtitle="No reinventamos lo que ya estaba bien. Cocinamos lo que crece aquí, lo cuidamos con técnica y lo servimos como se merece."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="grid gap-px overflow-hidden rounded-3xl border border-noir-line/70 bg-noir-line/60 md:grid-cols-3"
        >
          {PHILOSOPHY.map((p) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
                variants={fadeUp}
                transition={{ duration: 0.7 }}
                className="bg-noir p-10 transition-colors hover:bg-noir-mute md:p-12"
              >
                <Icon className="mb-7 h-7 w-7 text-champagne" />
                <h3 className="font-display text-3xl text-cream md:text-4xl">
                  {p.title}
                </h3>
                <p className="mt-5 text-sm leading-relaxed text-cream/65 md:text-base">
                  {p.body}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="mt-14 flex items-center gap-4 md:mt-20"
        >
          <span className="h-px flex-1 bg-noir-line" />
          <span className="text-[11px] uppercase tracking-[0.3em] text-cream/55">
            Chef ejecutivo ·{" "}
            <span className="text-champagne">{CHEF_NAME}</span>
          </span>
          <span className="h-px flex-1 bg-noir-line" />
        </motion.div>
      </div>
    </section>
  );
}

function Carta() {
  return (
    <section id="carta" className="relative bg-noir py-24 md:py-36">
      <div className="mx-auto max-w-6xl px-5 md:px-10">
        <SectionHeading
          eyebrow="La carta"
          title={
            <>
              Una cocina que cambia
              <br />
              <span className="italic font-normal text-champagne">
                con la temporada.
              </span>
            </>
          }
          subtitle="Esta es la carta del trimestre. Algunos platos rotan según lo que llegue de los pescadores y huertos asociados."
        />

        <div className="space-y-20 md:space-y-28">
          {MENU_SECTIONS.map((section) => (
            <motion.div
              key={section.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={stagger}
            >
              <motion.div
                variants={fadeUp}
                transition={{ duration: 0.6 }}
                className="mb-10 flex items-end justify-between gap-6 border-b border-noir-line/70 pb-5"
              >
                <div>
                  <div className="text-[10px] uppercase tracking-[0.3em] text-champagne">
                    {section.subtitle}
                  </div>
                  <h3 className="mt-2 font-display text-3xl tracking-tight text-cream md:text-5xl">
                    {section.label}
                  </h3>
                </div>
              </motion.div>

              <ul className="grid gap-x-12 gap-y-8 md:grid-cols-2 md:gap-y-10">
                {section.items.map((item) => (
                  <motion.li
                    key={item.name}
                    variants={fadeUp}
                    transition={{ duration: 0.6 }}
                    className="group flex gap-5 md:gap-6"
                  >
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-noir-line/70 bg-noir-mute md:h-28 md:w-28">
                      <img
                        src={item.image}
                        alt={item.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline gap-3">
                        <h4 className="font-display text-xl tracking-tight text-cream md:text-2xl">
                          {item.name}
                        </h4>
                        {item.tag && (
                          <span className="shrink-0 rounded-full border border-champagne/40 px-2.5 py-0.5 text-[9px] uppercase tracking-[0.2em] text-champagne">
                            {item.tag}
                          </span>
                        )}
                        <span className="ml-auto whitespace-nowrap font-display text-xl text-champagne md:text-2xl">
                          ${item.price}
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-cream/60 md:text-[15px]">
                        {item.description}
                      </p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="mt-24 md:mt-36"
        >
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="mb-10 flex items-end justify-between gap-6 border-b border-noir-line/70 pb-5"
          >
            <div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-champagne">
                La experiencia completa
              </div>
              <h3 className="mt-2 font-display text-3xl tracking-tight text-cream md:text-5xl">
                Tasting Menus
              </h3>
            </div>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2">
            {TASTING_MENUS.map((tm) => (
              <motion.div
                key={tm.title}
                variants={fadeUp}
                transition={{ duration: 0.7 }}
                className={`relative rounded-3xl border p-8 md:p-10 ${
                  tm.featured
                    ? "border-champagne/40 bg-gradient-to-br from-noir-soft to-noir-mute"
                    : "border-noir-line/70 bg-noir-soft"
                }`}
              >
                {tm.featured && (
                  <span className="absolute right-6 top-6 rounded-full border border-champagne/50 bg-champagne/10 px-3 py-1 text-[9px] uppercase tracking-[0.22em] text-champagne">
                    Recomendado
                  </span>
                )}
                <h4 className="font-display text-3xl text-cream md:text-4xl">
                  {tm.title}
                </h4>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-cream/65 md:text-base">
                  {tm.description}
                </p>
                <div className="mt-8 flex items-baseline justify-between border-t border-noir-line/70 pt-6">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.22em] text-cream/50">
                      Por persona
                    </div>
                    <div className="mt-1 font-display text-3xl text-champagne md:text-4xl">
                      ${tm.price}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] uppercase tracking-[0.22em] text-cream/50">
                      Con maridaje
                    </div>
                    <div className="mt-1 font-display text-2xl text-cream md:text-3xl">
                      ${tm.pairing}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 max-w-2xl text-sm text-cream/45 md:text-[15px]"
        >
          Todos los precios en USD. Comunícanos cualquier alergia o restricción
          alimentaria al reservar; el chef adapta la mesa según tu necesidad.
        </motion.p>
      </div>
    </section>
  );
}

function Galeria() {
  return (
    <section
      id="galeria"
      className="relative overflow-hidden bg-noir-soft py-24 md:py-36"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <SectionHeading
          eyebrow="La mesa"
          title={
            <>
              Una sala que respira.
              <br />
              <span className="italic font-normal text-champagne">
                Una cocina que canta.
              </span>
            </>
          }
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="grid auto-rows-[180px] grid-cols-2 gap-4 md:auto-rows-[230px] md:grid-cols-4 md:gap-5"
        >
          {GALLERY.map((g, i) => (
            <motion.figure
              key={i}
              variants={fadeUp}
              transition={{ duration: 0.7 }}
              className={`group relative overflow-hidden rounded-2xl bg-noir-mute ${g.span}`}
            >
              <img
                src={g.src}
                alt={g.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-all duration-700 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-noir/60 via-transparent opacity-50 transition-opacity group-hover:opacity-25" />
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Reservar() {
  const [name, setName] = useState("");
  const [people, setPeople] = useState("2");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [occasion, setOccasion] = useState("");
  const [notes, setNotes] = useState("");

  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const lines = [
      `Hola, me gustaría hacer una reservación en La Isla.`,
      ``,
      `• Nombre: ${name || "—"}`,
      `• Personas: ${people}`,
      `• Fecha: ${date || "—"}`,
      `• Hora: ${time || "—"}`,
    ];
    if (occasion) lines.push(`• Ocasión: ${occasion}`);
    if (notes) lines.push(`• Notas: ${notes}`);
    lines.push(``, `Gracias.`);
    const text = encodeURIComponent(lines.join("\n"));
    window.open(`${WHATSAPP}?text=${text}`, "_blank", "noopener,noreferrer");
  };

  return (
    <section
      id="reservar"
      className="relative overflow-hidden bg-noir py-24 md:py-36"
    >
      <div className="absolute inset-0 -z-0 opacity-30">
        <div className="absolute right-0 top-1/4 h-[500px] w-[500px] rounded-full bg-champagne/15 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-6xl px-5 md:px-10">
        <SectionHeading
          eyebrow="Reservaciones"
          title={
            <>
              Una mesa pensada
              <br />
              <span className="italic font-normal text-champagne">
                para ti.
              </span>
            </>
          }
          subtitle="Las reservaciones se confirman por WhatsApp. Llena los detalles y te contestamos en minutos con la mesa lista."
        />

        <motion.form
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          onSubmit={handleSubmit}
          className="grid gap-5 rounded-3xl border border-noir-line/70 bg-noir-soft p-6 md:grid-cols-2 md:gap-6 md:p-10"
        >
          <motion.label variants={fadeUp} className="block md:col-span-2">
            <span className="mb-2 block text-[10px] uppercase tracking-[0.22em] text-cream/50">
              Nombre completo
            </span>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tu nombre"
              className="input-base"
            />
          </motion.label>

          <motion.label variants={fadeUp} className="block">
            <span className="mb-2 block text-[10px] uppercase tracking-[0.22em] text-cream/50">
              Personas
            </span>
            <select
              required
              value={people}
              onChange={(e) => setPeople(e.target.value)}
              className="input-base appearance-none"
            >
              {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n} className="bg-noir text-cream">
                  {n} {n === 1 ? "persona" : "personas"}
                </option>
              ))}
            </select>
          </motion.label>

          <motion.label variants={fadeUp} className="block">
            <span className="mb-2 block text-[10px] uppercase tracking-[0.22em] text-cream/50">
              Fecha
            </span>
            <input
              type="date"
              required
              min={today}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="input-base"
            />
          </motion.label>

          <motion.label variants={fadeUp} className="block">
            <span className="mb-2 block text-[10px] uppercase tracking-[0.22em] text-cream/50">
              Hora
            </span>
            <input
              type="time"
              required
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="input-base"
            />
          </motion.label>

          <motion.label variants={fadeUp} className="block">
            <span className="mb-2 block text-[10px] uppercase tracking-[0.22em] text-cream/50">
              Ocasión <span className="text-cream/30">(opcional)</span>
            </span>
            <input
              type="text"
              value={occasion}
              onChange={(e) => setOccasion(e.target.value)}
              placeholder="Aniversario, cumpleaños, cena de negocios..."
              className="input-base"
            />
          </motion.label>

          <motion.label variants={fadeUp} className="block md:col-span-2">
            <span className="mb-2 block text-[10px] uppercase tracking-[0.22em] text-cream/50">
              Notas para el chef <span className="text-cream/30">(opcional)</span>
            </span>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Alergias, restricciones alimentarias, preferencias..."
              className="input-base resize-none"
            />
          </motion.label>

          <motion.div
            variants={fadeUp}
            className="md:col-span-2 mt-2 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between"
          >
            <p className="text-xs text-cream/45 sm:max-w-xs">
              Al enviar abrimos WhatsApp con tu pedido pre-escrito. Tú lo
              confirmas con un toque.
            </p>
            <button
              type="submit"
              className="group inline-flex min-h-[54px] items-center justify-center gap-2 rounded-full bg-champagne px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.22em] text-noir transition-all hover:bg-cream hover:shadow-[0_0_50px_var(--color-champagne-glow)]"
            >
              <MessageCircle className="h-4 w-4" />
              Reservar por WhatsApp
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </motion.div>
        </motion.form>
      </div>
    </section>
  );
}

function Visitanos() {
  return (
    <section
      id="visitanos"
      className="relative bg-noir-soft py-24 md:py-36"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <SectionHeading
          eyebrow="Visítanos"
          title={
            <>
              Un rincón en Fajardo,
              <br />
              <span className="italic font-normal text-champagne">
                listo para recibirte.
              </span>
            </>
          }
        />

        <div className="grid gap-8 lg:grid-cols-5 lg:gap-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="lg:col-span-2"
          >
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              className="rounded-3xl border border-noir-line/70 bg-noir p-8 md:p-10"
            >
              <div className="mb-6 flex items-center gap-3">
                <Clock className="h-5 w-5 text-champagne" />
                <h3 className="font-display text-xl text-cream md:text-2xl">
                  Horario
                </h3>
              </div>
              <ul className="divide-y divide-noir-line/60">
                {SCHEDULE.map((s) => (
                  <li
                    key={s.day}
                    className="flex items-center justify-between py-3 text-sm md:text-base"
                  >
                    <span className="text-cream/85">{s.day}</span>
                    <span
                      className={
                        s.closed
                          ? "text-cream/35"
                          : "font-medium text-cream"
                      }
                    >
                      {s.hours}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2"
            >
              <a
                href={`tel:${PHONE_RAW}`}
                className="group flex items-center gap-4 rounded-2xl border border-noir-line/70 bg-noir p-5 transition-colors hover:border-champagne/40"
              >
                <span className="grid h-11 w-11 place-items-center rounded-full bg-champagne/10 text-champagne">
                  <Phone className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-[10px] uppercase tracking-[0.22em] text-cream/50">
                    Teléfono
                  </span>
                  <span className="block text-sm font-medium text-cream">
                    {PHONE_DISPLAY}
                  </span>
                </span>
              </a>
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-4 rounded-2xl border border-noir-line/70 bg-noir p-5 transition-colors hover:border-champagne/40"
              >
                <span className="grid h-11 w-11 place-items-center rounded-full bg-champagne/10 text-champagne">
                  <MessageCircle className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-[10px] uppercase tracking-[0.22em] text-cream/50">
                    WhatsApp
                  </span>
                  <span className="block text-sm font-medium text-cream">
                    Chat directo
                  </span>
                </span>
              </a>
            </motion.div>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              className="mt-6 flex items-start gap-4 rounded-2xl border border-noir-line/70 bg-noir p-6"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-champagne/10 text-champagne">
                <MapPin className="h-5 w-5" />
              </span>
              <div>
                <span className="block text-[10px] uppercase tracking-[0.22em] text-cream/50">
                  Dirección
                </span>
                <span className="mt-1 block text-sm leading-relaxed text-cream">
                  {ADDRESS}
                </span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="overflow-hidden rounded-3xl border border-noir-line/70 lg:col-span-3"
          >
            <iframe
              title="Ubicación de La Isla en Fajardo"
              src="https://www.google.com/maps?q=Fajardo,+Puerto+Rico&output=embed"
              loading="lazy"
              className="h-[420px] w-full md:h-full md:min-h-[520px]"
              referrerPolicy="no-referrer-when-downgrade"
              style={{ filter: "invert(0.92) hue-rotate(180deg) saturate(0.6)" }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function CTAFinal() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-noir-soft via-noir to-noir-soft py-24 md:py-36">
      <div className="absolute inset-0 -z-0">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-champagne/15 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-3xl px-5 text-center md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-champagne/40 bg-champagne/5 px-4 py-1.5 text-[10px] uppercase tracking-[0.28em] text-champagne">
            <Calendar className="h-3.5 w-3.5" />
            Pocas mesas, mucho cuidado
          </span>
          <h2 className="mt-7 font-display text-4xl leading-[1.05] tracking-tight text-cream sm:text-5xl md:text-6xl lg:text-7xl">
            La isla espera.
            <br />
            <span className="italic font-normal text-champagne">
              Tú escoges la noche.
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-cream/65 md:text-lg">
            Reserva tu mesa en menos de un minuto. Confirmamos por WhatsApp y te
            preparamos la experiencia.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <a
              href="#reservar"
              className="group inline-flex min-h-[56px] items-center justify-center gap-2 rounded-full bg-champagne px-8 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-noir transition-all hover:bg-cream hover:shadow-[0_0_60px_var(--color-champagne-glow)]"
            >
              <Calendar className="h-4 w-4" />
              Reservar mesa
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href={`tel:${PHONE_RAW}`}
              className="inline-flex min-h-[56px] items-center justify-center gap-2 rounded-full border border-cream/25 px-8 py-4 text-xs font-medium uppercase tracking-[0.22em] text-cream transition-all hover:border-cream hover:bg-cream/5"
            >
              <Phone className="h-4 w-4" />
              {PHONE_DISPLAY}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function IconInstagram(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconFacebook(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-noir-line/70 bg-noir">
      <div className="mx-auto max-w-7xl px-5 py-14 md:px-10 md:py-20">
        <div className="grid gap-10 md:grid-cols-4 md:gap-12">
          <div className="md:col-span-2">
            <a
              href="#inicio"
              className="flex items-baseline gap-1 font-display text-3xl tracking-tight text-cream"
            >
              <span className="italic">La</span>
              <span className="font-medium">Isla</span>
              <span className="ml-1 inline-block h-1.5 w-1.5 rounded-full bg-champagne" />
            </a>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-cream/55">
              Cocina contemporánea con producto puertorriqueño. Tasting menu,
              técnica francesa y reservaciones cuidadas en Fajardo, PR.
            </p>
            <div className="mt-7 flex items-center gap-3">
              {[
                { icon: IconInstagram, href: "https://instagram.com" },
                { icon: IconFacebook, href: "https://facebook.com" },
                { icon: MessageCircle, href: WHATSAPP },
              ].map((s, i) => {
                const Icon = s.icon;
                return (
                  <a
                    key={i}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="grid h-11 w-11 place-items-center rounded-full border border-noir-line/70 text-cream/70 transition-colors hover:border-champagne/40 hover:text-champagne"
                    aria-label="Red social"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h4 className="text-[10px] uppercase tracking-[0.25em] text-cream/40">
              Navegación
            </h4>
            <ul className="mt-5 space-y-3 text-sm">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-cream/75 transition-colors hover:text-champagne"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] uppercase tracking-[0.25em] text-cream/40">
              Contacto
            </h4>
            <ul className="mt-5 space-y-3 text-sm">
              <li className="flex items-start gap-2 text-cream/75">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-champagne" />
                {ADDRESS}
              </li>
              <li>
                <a
                  href={`tel:${PHONE_RAW}`}
                  className="flex items-start gap-2 text-cream/75 hover:text-champagne"
                >
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-champagne" />
                  {PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <a
                  href={WHATSAPP}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start gap-2 text-cream/75 hover:text-champagne"
                >
                  <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-champagne" />
                  WhatsApp
                </a>
              </li>
              <li className="flex items-start gap-2 text-cream/55">
                <Users className="mt-0.5 h-4 w-4 shrink-0 text-champagne" />
                Reservaciones para grupos &gt; 8
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-noir-line/70 pt-8 text-xs text-cream/45 sm:flex-row sm:items-center">
          <span>© {year} La Isla. Todos los derechos reservados.</span>
          <a
            href="https://veldevpr.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-cream/55 transition-colors hover:text-champagne"
          >
            Desarrollado por{" "}
            <span className="font-medium text-cream">VelDev PR</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="grain min-h-screen bg-noir text-cream antialiased">
      <Navbar />
      <main>
        <Hero />
        <Filosofia />
        <Carta />
        <Galeria />
        <Reservar />
        <Visitanos />
        <CTAFinal />
      </main>
      <Footer />
    </div>
  );
}
