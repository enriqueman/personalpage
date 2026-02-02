"use client"

import jsPDF from "jspdf"
import { cvData } from "./cv-data"

// ---------- Configuración general ----------
const PAGE_WIDTH = 210
const PAGE_HEIGHT = 297
const MARGIN_TOP = 20
const MARGIN_BOTTOM = 20
const MARGIN_LEFT = 15
const MARGIN_RIGHT = 15
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN_LEFT - MARGIN_RIGHT // 180 mm

// Columnas: 60% izquierda, 40% derecha (fondo #E8F4F8 desde inicio columna hasta margen derecho)
const COL_GAP = 5
const LEFT_COL_WIDTH = Math.round(CONTENT_WIDTH * 0.6) - COL_GAP
const RIGHT_COL_WIDTH = CONTENT_WIDTH * 0.4 // 40% del contenido
const LEFT_COL_X = MARGIN_LEFT
const RIGHT_COL_X = MARGIN_LEFT + LEFT_COL_WIDTH + COL_GAP

// Márgenes contenido columna derecha: 0,5 cm títulos, 1 cm ítems
const RIGHT_COL_PADDING_TITLE = 5  // 0,5 cm
const RIGHT_COL_PADDING_ITEM = 10  // 1 cm

// Colores (RGB 0-255): #2C3E50, #0066CC, #555555, #777777, #CCCCCC, #E8F4F8
const COLORS = {
  dark: [44, 62, 80],       // texto principal
  blue: [0, 102, 204],      // títulos sección, enlaces
  mediumGray: [85, 85, 85], // subtítulo, viñetas
  lightGray: [119, 119, 119], // fechas, secundario
  borderGray: [204, 204, 204], // bordes
  rightColumnBg: [232, 244, 248], // fondo columna derecha #E8F4F8
}

// Tamaños y espaciados (spec)
const PHOTO_SIZE = 80
const NAME_SIZE = 28
const SUBTITLE_SIZE = 11
const SECTION_TITLE_SIZE = 12
const RIGHT_SECTION_TITLE_SIZE = 11
const ROLE_SIZE = 11
const BODY_SIZE = 10
const BODY_SMALL = 9
const PERIOD_SIZE = 9

const FONT = "helvetica"

// Iconos de contacto: rutas en public/icons (fallback Zapf Dingbats si no hay imagen)
const CONTACT_ICON_PATHS = {
  phone: "/icons/ring-phone.png",
  location: "/icons/maps-and-location.png",
  email: "/icons/correo-electronico.png",
  web: "/icons/senal-mundial.png",
  linkedin: "/icons/linkedin.png",
  github: "/icons/github.png",
}
// Zapf Dingbats fallback cuando no hay imagen cargada
const ZAPF_PHONE = 37
const ZAPF_LOCATION = 47
const ZAPF_EMAIL = 65
const ZAPF_WEB = 56
const CONTACT_ICON_SIZE = 4 // mm
const CONTACT_ICON_GAP = 2 // mm

/**
 * Aplica color de texto.
 */
function setColor(doc, color) {
  doc.setTextColor(color[0], color[1], color[2])
}

/**
 * Dibuja línea separadora (1 pt azul, ancho en mm).
 */
function drawSeparatorLine(doc, x, y, widthMm, lineWidthPt = 1) {
  doc.setDrawColor(COLORS.blue[0], COLORS.blue[1], COLORS.blue[2])
  doc.setLineWidth(lineWidthPt)
  doc.line(x, y, x + widthMm, y)
}

/**
 * Dibuja una línea justificada: reparte el espacio extra entre palabras para llenar maxWidth.
 * Usa la fuente/tamaño actual del doc (debe estar ya configurado en addText).
 */
function drawJustifiedLine(doc, line, x, y, maxWidth) {
  const words = line.trim().split(/\s+/).filter(Boolean)
  if (words.length <= 1) {
    doc.text(line.trim(), x, y)
    return
  }
  const spaceWidth = doc.getTextWidth(" ")
  let totalWordsWidth = 0
  for (const w of words) totalWordsWidth += doc.getTextWidth(w)
  const totalSpaceWidth = spaceWidth * (words.length - 1)
  const gap = maxWidth - totalWordsWidth - totalSpaceWidth
  const extraSpace = gap > 0 ? gap / (words.length - 1) : 0
  let currentX = x
  for (let j = 0; j < words.length; j++) {
    doc.text(words[j], currentX, y)
    currentX += doc.getTextWidth(words[j])
    if (j < words.length - 1) currentX += spaceWidth + extraSpace
  }
}

/**
 * Añade texto con wrap; devuelve nueva Y. Opciones: fontSize, color, lineHeightRatio, autoPageBreak, fontStyle, align.
 * align: 'left' | 'justify' — para párrafos usar align: 'justify' (justificación manual, ya que jsPDF no justifica bien con maxWidth).
 */
function addText(doc, text, x, y, maxWidth, options = {}) {
  const {
    fontSize = BODY_SIZE,
    color = COLORS.dark,
    lineHeightRatio = 1.3,
    autoPageBreak = false,
    fontStyle = "normal",
    align = "left",
  } = options
  doc.setFontSize(fontSize)
  doc.setFont(FONT, fontStyle)
  setColor(doc, color)
  const lines = doc.splitTextToSize(text, maxWidth)
  const lineHeightMm = (fontSize * 0.35) * lineHeightRatio // aprox mm por línea
  const state = options.state
  const dataForSoftSkills = options.dataForSoftSkills
  const doJustify = align === "justify"
  for (let i = 0; i < lines.length; i++) {
    if (autoPageBreak && y + lineHeightMm > PAGE_HEIGHT - MARGIN_BOTTOM) {
      doc.addPage()
      const drawSoftSkills = state && !state.softSkillsDrawnInRightColumn
      drawRightColumnBackground(doc, drawSoftSkills ? dataForSoftSkills : undefined)
      if (state) state.softSkillsDrawnInRightColumn = true
      y = MARGIN_TOP
    }
    if (doJustify && lines[i].trim().length > 0) {
      drawJustifiedLine(doc, lines[i], x, y, maxWidth)
    } else {
      doc.text(lines[i], x, y, { maxWidth, align: "left" })
    }
    y += lineHeightMm
  }
  doc.setFont(FONT, "normal")
  return y
}

/**
 * Añade texto en negrita (usa fontStyle: "bold" en addText para que no se sobrescriba).
 */
function addTextBold(doc, text, x, y, maxWidth, options = {}) {
  return addText(doc, text, x, y, maxWidth, { ...options, fontStyle: "bold" })
}

/**
 * Añade texto en cursiva (periodos/fechas).
 */
function addTextItalic(doc, text, x, y, maxWidth, options = {}) {
  return addText(doc, text, x, y, maxWidth, { ...options, fontSize: options.fontSize || PERIOD_SIZE, fontStyle: "italic" })
}

/**
 * Título de sección izquierda (12 pt, azul, + línea 40 mm).
 * Si hace falta nueva página, dibuja fondo columna derecha (y SOFT SKILLS la primera vez).
 */
function addLeftSectionTitle(doc, text, x, y, maxWidth, data, state) {
  if (y > PAGE_HEIGHT - MARGIN_BOTTOM - 20) {
    doc.addPage()
    const drawSoftSkills = state && !state.softSkillsDrawnInRightColumn
    drawRightColumnBackground(doc, drawSoftSkills ? data : undefined)
    if (state) state.softSkillsDrawnInRightColumn = true
    y = MARGIN_TOP
  }
  y += 12 // espaciado superior 12 mm
  doc.setFontSize(SECTION_TITLE_SIZE)
  doc.setFont(FONT, "bold")
  setColor(doc, COLORS.blue)
  doc.text(text, x, y)
  y += 6
  drawSeparatorLine(doc, x, y, 40, 1)
  y += 8 // espaciado inferior línea 8 mm
  setColor(doc, COLORS.dark)
  return y
}

/**
 * Título de sección derecha (11 pt, azul, + línea 0.5 pt ancho columna).
 */
function addRightSectionTitle(doc, text, x, y, colWidth) {
  doc.setFontSize(RIGHT_SECTION_TITLE_SIZE)
  doc.setFont(FONT, "bold")
  setColor(doc, COLORS.blue)
  doc.text(text, x, y)
  y += 6
  drawSeparatorLine(doc, x, y, colWidth, 0.5)
  y += 6
  setColor(doc, COLORS.dark)
  return y
}

/**
 * Dibuja el icono de contacto: imagen de public/icons si existe en contactIcons, si no Zapf Dingbats o badge.
 * contactIcons: { phone?, location?, web?, linkedin?, github? } en base64.
 */
function drawContactIcon(doc, iconType, x, y, contactIcons = {}) {
  const size = CONTACT_ICON_SIZE
  const img = contactIcons[iconType]
  if (img) {
    try {
      doc.addImage(img, "PNG", x, y - size, size, size)
    } catch (_) {}
    doc.setFont(FONT, "normal")
    return size
  }
  setColor(doc, COLORS.blue)
  if (iconType === "phone") {
    doc.setFont("zapfdingbats", "normal")
    doc.setFontSize(BODY_SMALL)
    doc.text(String.fromCharCode(ZAPF_PHONE), x, y)
  } else if (iconType === "location") {
    doc.setFont("zapfdingbats", "normal")
    doc.setFontSize(BODY_SMALL)
    doc.text(String.fromCharCode(ZAPF_LOCATION), x, y)
  } else if (iconType === "email") {
    doc.setFont("zapfdingbats", "normal")
    doc.setFontSize(BODY_SMALL)
    doc.text(String.fromCharCode(ZAPF_EMAIL), x, y)
  } else if (iconType === "web") {
    doc.setFont("zapfdingbats", "normal")
    doc.setFontSize(BODY_SMALL)
    doc.text(String.fromCharCode(ZAPF_WEB), x, y)
  } else if (iconType === "linkedin" || iconType === "github") {
    doc.setFont(FONT, "bold")
    doc.setFontSize(6)
    const badgeW = 5
    const badgeH = 3.5
    doc.setFillColor(COLORS.blue[0], COLORS.blue[1], COLORS.blue[2])
    doc.roundedRect(x, y - badgeH + 1, badgeW, badgeH, 0.8, 0.8, "F")
    setColor(doc, [255, 255, 255])
    const badgeText = iconType === "linkedin" ? "in" : "G"
    doc.text(badgeText, x + badgeW / 2 - doc.getTextWidth(badgeText) / 2, y - 0.5)
    setColor(doc, COLORS.blue)
    doc.setFont(FONT, "normal")
    return badgeW
  }
  doc.setFont(FONT, "normal")
  return size
}

/**
 * Dibuja una línea de contacto con icono + valor. iconType: "phone" | "location" | "email" | "web" | "linkedin" | "github".
 * contactIcons: objeto con base64 de iconos desde public/icons.
 */
function addContactItem(doc, iconType, value, x, y, wItem, contactIcons = {}) {
  const iconW = drawContactIcon(doc, iconType, x, y, contactIcons)
  const gap = CONTACT_ICON_GAP
  doc.setFont(FONT, "normal")
  setColor(doc, COLORS.dark)
  doc.setFontSize(BODY_SMALL)
  y = addText(doc, value, x + iconW + gap, y, wItem - iconW - gap, { fontSize: BODY_SMALL, lineHeightRatio: 1.2 })
  return y
}

/**
 * Título de sección página 2+ (mismo estilo que izquierda).
 * Si hace falta nueva página, dibuja fondo columna derecha (y SOFT SKILLS la primera vez).
 */
function addPage2SectionTitle(doc, text, x, y, maxWidth, data, state) {
  if (y + 25 > PAGE_HEIGHT - MARGIN_BOTTOM) {
    doc.addPage()
    const drawSoftSkills = state && !state.softSkillsDrawnInRightColumn
    drawRightColumnBackground(doc, drawSoftSkills ? data : undefined)
    if (state) state.softSkillsDrawnInRightColumn = true
    y = MARGIN_TOP
  }
  y += 12
  doc.setFontSize(SECTION_TITLE_SIZE)
  doc.setFont(FONT, "bold")
  setColor(doc, COLORS.blue)
  doc.text(text, x, y)
  y += 6
  drawSeparatorLine(doc, x, y, 40, 1)
  y += 8
  setColor(doc, COLORS.dark)
  return y
}

/**
 * Dibuja el fondo de la columna derecha (#E8F4F8): toda la franja derecha de la página,
 * incluyendo margen superior, margen derecho y margen inferior (desde RIGHT_COL_X hasta el borde derecho, de 0 a PAGE_HEIGHT).
 * Si se pasa data, además dibuja SOFT SKILLS en esa columna (solo la primera vez que se añade página 2).
 */
function drawRightColumnBackground(doc, data) {
  const x = RIGHT_COL_X
  const y = 0
  const w = PAGE_WIDTH - RIGHT_COL_X // hasta el borde derecho (incluye margen derecho)
  const h = PAGE_HEIGHT // toda la altura (incluye márgenes superior e inferior)
  doc.setFillColor(COLORS.rightColumnBg[0], COLORS.rightColumnBg[1], COLORS.rightColumnBg[2])
  doc.rect(x, y, w, h, "F")
  if (data) {
    let y = drawSoftSkillsInRightColumn(doc, data)
    drawPersonalReferencesInRightColumn(doc, data, y)
  }
}

/**
 * Devuelve si hay que cambiar de página; si es así, añade página, dibuja fondo columna derecha (y SOFT SKILLS la primera vez) y devuelve posición columna izquierda.
 */
function maybeNewPage(doc, y, data, state) {
  if (y > PAGE_HEIGHT - MARGIN_BOTTOM - 15) {
    doc.addPage()
    const drawSoftSkills = state && !state.softSkillsDrawnInRightColumn
    drawRightColumnBackground(doc, drawSoftSkills ? data : undefined)
    if (state) state.softSkillsDrawnInRightColumn = true
    return { y: MARGIN_TOP, x: LEFT_COL_X, maxWidth: LEFT_COL_WIDTH }
  }
  return null
}

/**
 * Columna derecha página 1: fondo #E8F4F8, foto 80x80 con borde, Contact, Languages, Skills.
 * SOFT SKILLS se dibuja en la columna derecha de la página 2 para que no se corte.
 */
function drawRightColumn(doc, data, imageBase64, contactIcons = {}) {
  drawRightColumnBackground(doc)

  const x = RIGHT_COL_X
  const w = RIGHT_COL_WIDTH
  const xTitle = RIGHT_COL_X + RIGHT_COL_PADDING_TITLE
  const wTitle = RIGHT_COL_WIDTH - RIGHT_COL_PADDING_TITLE
  const xItem = RIGHT_COL_X + RIGHT_COL_PADDING_ITEM
  const wItem = RIGHT_COL_WIDTH - RIGHT_COL_PADDING_ITEM
  let y = MARGIN_TOP

  // Foto 80x80, sin borde ni fondo
  if (imageBase64) {
    try {
      doc.addImage(imageBase64, "PNG", x, y, PHOTO_SIZE, PHOTO_SIZE)
    } catch (_) {}
    y += PHOTO_SIZE + 12
  }

  const lineHeight = 1.3
  const betweenLines = 4

  // CONTACT: cada ítem con iconos de public/icons (fallback Zapf/badge)
  y = addRightSectionTitle(doc, data.contactTitle, xTitle, y, wTitle)
  const contactGap = 3
  y = addContactItem(doc, "phone", data.phone, xItem, y, wItem, contactIcons)
  y += contactGap
  y = addContactItem(doc, "location", data.location, xItem, y, wItem, contactIcons)
  y += contactGap
  y = addContactItem(doc, "email", data.email, xItem, y, wItem, contactIcons)
  y += contactGap
  y = addContactItem(doc, "web", data.web, xItem, y, wItem, contactIcons)
  y += contactGap
  y = addContactItem(doc, "linkedin", data.linkedin, xItem, y, wItem, contactIcons)
  y += contactGap
  y = addContactItem(doc, "github", data.github, xItem, y, wItem, contactIcons)
  y += 12
  setColor(doc, COLORS.dark)

  // LANGUAGES
  if (data.languagesTitle) {
    y = addRightSectionTitle(doc, data.languagesTitle, xTitle, y, wTitle)
    y = addText(doc, data.languages, xItem, y, wItem, { fontSize: BODY_SMALL, lineHeightRatio: lineHeight })
    y += 12
  }

  // SKILLS (SOFT SKILLS se dibuja en la columna derecha de la página 2 para que no se corte)
  y = addRightSectionTitle(doc, data.skillsTitle, xTitle, y, wTitle)
  const skillsLines = data.skills.split(",").map((s) => s.trim())
  for (const skill of skillsLines) {
    y = addText(doc, skill, xItem, y, wItem, { fontSize: BODY_SMALL, lineHeightRatio: 1.2 })
    y += 2
  }
}

/**
 * Dibuja solo la sección SOFT SKILLS en la columna derecha (mismo estilo que en página 1).
 * Devuelve la Y final para que debajo se dibuje PERSONAL REFERENCES.
 */
function drawSoftSkillsInRightColumn(doc, data) {
  const xTitle = RIGHT_COL_X + RIGHT_COL_PADDING_TITLE
  const wTitle = RIGHT_COL_WIDTH - RIGHT_COL_PADDING_TITLE
  const xItem = RIGHT_COL_X + RIGHT_COL_PADDING_ITEM
  const wItem = RIGHT_COL_WIDTH - RIGHT_COL_PADDING_ITEM
  let y = MARGIN_TOP
  if (!data.softSkillsTitle) return y
  y = addRightSectionTitle(doc, data.softSkillsTitle, xTitle, y, wTitle)
  setColor(doc, COLORS.dark)
  doc.setFontSize(BODY_SMALL)
  doc.setFont(FONT, "normal")
  const skills = (typeof data.softSkills === "string"
    ? data.softSkills.split(". ").map((s) => s.trim()).filter(Boolean)
    : data.softSkills)
  const tightLine = { fontSize: BODY_SMALL, lineHeightRatio: 1 }
  for (const skill of skills) {
    y = addText(doc, skill, xItem, y, wItem, tightLine)
    y += 2
  }
  return y
}

/**
 * Dibuja la sección PERSONAL REFERENCES en la columna derecha (página 2).
 * startY: posición donde empieza (debajo de SOFT SKILLS).
 */
function drawPersonalReferencesInRightColumn(doc, data, startY) {
  if (!data.referencesTitle || !data.ref1) return
  const xTitle = RIGHT_COL_X + RIGHT_COL_PADDING_TITLE
  const wTitle = RIGHT_COL_WIDTH - RIGHT_COL_PADDING_TITLE
  const xItem = RIGHT_COL_X + RIGHT_COL_PADDING_ITEM
  const wItem = RIGHT_COL_WIDTH - RIGHT_COL_PADDING_ITEM
  let y = startY + 12
  y = addRightSectionTitle(doc, data.referencesTitle, xTitle, y, wTitle)
  const refs = [data.ref1, data.ref2, data.ref3].filter(Boolean)
  for (const ref of refs) {
    y += 2
    y = addTextBold(doc, ref.name, xItem, y, wItem, { fontSize: BODY_SIZE })
    y += 1
    setColor(doc, COLORS.mediumGray)
    y = addText(doc, ref.title, xItem, y, wItem, { fontSize: BODY_SMALL })
    y += 1
    setColor(doc, COLORS.dark)
    y = addText(doc, ref.phone, xItem, y, wItem, { fontSize: BODY_SMALL })
    y += 2
  }
}

function loadImageAsBase64(path) {
  if (typeof window === "undefined") return Promise.resolve(null)
  const url = `${window.location.origin}${path}`
  return fetch(url)
    .then((r) => (r.ok ? r.blob() : Promise.reject(new Error("Not found"))))
    .then(
      (blob) =>
        new Promise((resolve, reject) => {
          const fr = new FileReader()
          fr.onload = () => resolve(fr.result)
          fr.onerror = reject
          fr.readAsDataURL(blob)
        })
    )
    .catch(() => null)
}

function loadProfileImageAsBase64() {
  return loadImageAsBase64("/enriqueManzano.png")
}

/** Carga todos los iconos de contacto desde public/icons. Devuelve { phone, location, email, web, linkedin, github }. */
function loadContactIcons() {
  if (typeof window === "undefined") return Promise.resolve({})
  const entries = Object.entries(CONTACT_ICON_PATHS)
  return Promise.all(entries.map(([key, path]) => loadImageAsBase64(path).then((data) => [key, data])))
    .then((results) => Object.fromEntries(results.filter(([, v]) => v != null)))
    .catch(() => ({}))
}

function buildPdf(lang, imageBase64, contactIcons = {}) {
  const data = cvData[lang] || cvData.en
  const doc = new jsPDF({ unit: "mm", format: "a4" })
  const state = { softSkillsDrawnInRightColumn: false }

  // Fondo blanco implícito; colores de texto se aplican en cada bloque
  setColor(doc, COLORS.dark)

  // ---------- Página 1: columna derecha (Photo, Contact con iconos de public/icons, Languages, Skills) ----------
  drawRightColumn(doc, data, imageBase64, contactIcons)

  // ---------- Página 1: columna izquierda ----------
  let x = LEFT_COL_X
  let y = MARGIN_TOP
  let maxWidth = LEFT_COL_WIDTH

  // 1. Nombre: 28 pt Bold #2C3E50, espaciado inferior 3 mm
  setColor(doc, COLORS.dark)
  y = addTextBold(doc, data.name, x, y, maxWidth, { fontSize: NAME_SIZE, lineHeightRatio: 1 })
  y += 1

  // Subtítulo: 11 pt Bold #555555 (negrita como subtítulo), espaciado inferior 12 mm
  setColor(doc, COLORS.mediumGray)
  y = addTextBold(doc, data.title, x, y, maxWidth, { fontSize: SUBTITLE_SIZE, lineHeightRatio: 1 })
  y += 3
  setColor(doc, COLORS.dark)

  // 2. Descripción del perfil: 10 pt, justificado (simulado con left), line height 1.4, espaciado inferior 15 mm
  y = addText(doc, data.summary, x, y, maxWidth, { fontSize: BODY_SIZE, lineHeightRatio: 1.4, align: "justify" })
  y += 3

  // 3. WORK EXPERIENCE
  y = addLeftSectionTitle(doc, data.workTitle, x, y, maxWidth, data, state)
  // Empresa y puesto: 11 pt Bold #2C3E50, esp. superior 6, inferior 4
  y += 3
  y = addTextBold(doc, `${data.job1.role} · ${data.job1.period}`, x, y, maxWidth, { fontSize: ROLE_SIZE })
  y += 3
  // Viñetas: 10 pt, • color #555555, indent 15 mm, entre viñetas 3 mm, line height 1.3
  const bulletIndent = 15
  setColor(doc, COLORS.dark)
  for (const point of data.job1.points) {
    setColor(doc, COLORS.mediumGray)
    doc.setFontSize(BODY_SIZE)
    doc.text("•", x, y)
    setColor(doc, COLORS.dark)
    y = addText(doc, point, x + bulletIndent, y, maxWidth - bulletIndent, { fontSize: BODY_SIZE, lineHeightRatio: 1.3, align: "justify" })
    y += 3
  }
  y += 3

  let page1Break = maybeNewPage(doc, y, data, state)
  if (page1Break) {
    y = page1Break.y
    x = page1Break.x
    maxWidth = page1Break.maxWidth
  }

  // 4. ACADEMIC EXPERIENCE (primeros dos proyectos) — autoPageBreak para no cortar texto
  const useAutoPageBreakPage1 = { autoPageBreak: true, state, dataForSoftSkills: data }
  y = addLeftSectionTitle(doc, data.academicTitle, x, y, maxWidth, data, state)
  for (const a of [data.academic1, data.academic2]) {
    const brBefore = maybeNewPage(doc, y, data, state)
    if (brBefore) {
      y = brBefore.y
      x = brBefore.x
      maxWidth = brBefore.maxWidth
    }
    y += 3
    y = addTextBold(doc, a.name, x, y, maxWidth, { fontSize: ROLE_SIZE })
    y += 4
    y = addText(doc, a.desc, x + bulletIndent, y, maxWidth - bulletIndent, { fontSize: BODY_SIZE, lineHeightRatio: 1.3, color: COLORS.dark, align: "justify", ...useAutoPageBreakPage1 })
    y += 4
    setColor(doc, COLORS.lightGray)
    y = addTextItalic(doc, `Period: ${a.period}`, x, y, maxWidth, { color: COLORS.lightGray })
    y += 3
    setColor(doc, COLORS.dark)
  }

  // ---------- Página 2: misma estructura de dos columnas (fondo + SOFT SKILLS la primera vez) ----------
  const br2 = maybeNewPage(doc, y, data, state)
  if (br2) {
    y = br2.y
    x = br2.x
    maxWidth = br2.maxWidth
  }

  const useAutoPageBreak = { autoPageBreak: true, state, dataForSoftSkills: data }

  // Continuación ACADEMIC EXPERIENCE: tercer proyecto (sin repetir el título de sección)
  const academic3 = data.academic3
  y += 3
  y = addTextBold(doc, academic3.name, x, y, maxWidth, useAutoPageBreak)
  y += 4
  y = addText(doc, academic3.desc, x + bulletIndent, y, maxWidth - bulletIndent, { fontSize: BODY_SIZE, lineHeightRatio: 1.3, align: "justify", ...useAutoPageBreak })
  y += 4
  setColor(doc, COLORS.lightGray)
  y = addTextItalic(doc, `Period: ${academic3.period}`, x, y, maxWidth, { ...useAutoPageBreak, color: COLORS.lightGray })
  y += 3
  setColor(doc, COLORS.dark)

  // PERSONAL PROJECTS
  y = addPage2SectionTitle(doc, data.projectsTitle, x, y, maxWidth, data, state)
  if (data.projectsIntro) {
    y = addText(doc, data.projectsIntro, x, y, maxWidth, { fontSize: BODY_SIZE, lineHeightRatio: 1.4, align: "justify", ...useAutoPageBreak })
    y += 3
  }
  // Proyecto 1
  y += 6
  y = addTextBold(doc, "Personal web portfolio", x, y, maxWidth, useAutoPageBreak)
  y += 4
  y = addText(doc, data.proj1, x + bulletIndent, y, maxWidth - bulletIndent, { fontSize: BODY_SIZE, lineHeightRatio: 1.3, align: "justify", ...useAutoPageBreak })
  y += 4
  setColor(doc, COLORS.blue)
  y = addText(doc, "www.enriquemv.com", x, y, maxWidth, { fontSize: BODY_SMALL, ...useAutoPageBreak })
  y += 3
  setColor(doc, COLORS.dark)
  // Proyecto 2
  y += 6
  y = addTextBold(doc, "Ataraxia Blog Management and Publishing System", x, y, maxWidth, useAutoPageBreak)
  y += 4
  y = addText(doc, data.proj2, x + bulletIndent, y, maxWidth - bulletIndent, { fontSize: BODY_SIZE, lineHeightRatio: 1.3, align: "justify", ...useAutoPageBreak })
  y += 4
  setColor(doc, COLORS.blue)
  y = addText(doc, "www.ataraxiapro.com", x, y, maxWidth, { fontSize: BODY_SMALL, ...useAutoPageBreak })
  y += 3
  setColor(doc, COLORS.dark)

  // ACADEMIC BACKGROUND
  y = addPage2SectionTitle(doc, data.educationTitle, x, y, maxWidth, data, state)
  const edus = [data.edu1, data.edu2, data.edu3, data.edu4, data.edu5]
  for (const e of edus) {
    const parts = e.split(" · ").map((p) => p.trim())
    const titlePart = parts[0] || e
    const periodInst = parts.slice(1).join(" · ")
    y += 3
    y = addTextBold(doc, titlePart, x, y, maxWidth, { fontSize: BODY_SIZE, ...useAutoPageBreak })
    y += 2
    setColor(doc, COLORS.lightGray)
    y = addText(doc, periodInst, x, y, maxWidth, { fontSize: BODY_SMALL, ...useAutoPageBreak })
    y += 3
    setColor(doc, COLORS.dark)
  }

  // PERSONAL REFERENCES se dibuja en la columna derecha de la página 2 (junto con SOFT SKILLS)

  return doc
}

/**
 * Genera y descarga el CV en PDF.
 */
export function downloadCvPdf(lang) {
  const safeLang = lang === "es" ? "es" : "en"
  const filename =
    safeLang === "es" ? "CV_Cesar_Enrique_Manzano_Velasco.pdf" : "CV_Cesar_Enrique_Manzano_Velasco_EN.pdf"

  Promise.all([loadProfileImageAsBase64(), loadContactIcons()])
    .then(([imageBase64, contactIcons]) => {
      const doc = buildPdf(safeLang, imageBase64, contactIcons || {})
      doc.save(filename)
    })
    .catch(() => {
      const doc = buildPdf(safeLang, null, {})
      doc.save(filename)
    })
}
