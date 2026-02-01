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

// Columnas: 60% izquierda, 40% derecha, ~70 mm derecha
const COL_GAP = 5
const LEFT_COL_WIDTH = Math.round(CONTENT_WIDTH * 0.6) - COL_GAP // ~105 mm
const RIGHT_COL_WIDTH = 70 // ~70 mm según spec
const LEFT_COL_X = MARGIN_LEFT
const RIGHT_COL_X = MARGIN_LEFT + LEFT_COL_WIDTH + COL_GAP

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
 * Añade texto con wrap; devuelve nueva Y. Opciones: fontSize, color, lineHeightRatio, autoPageBreak.
 * Si autoPageBreak, al añadir página se dibuja solo el fondo de la columna derecha (sin repetir contenido).
 */
function addText(doc, text, x, y, maxWidth, options = {}) {
  const {
    fontSize = BODY_SIZE,
    color = COLORS.dark,
    lineHeightRatio = 1.3,
    autoPageBreak = false,
  } = options
  doc.setFontSize(fontSize)
  doc.setFont(FONT, "normal")
  setColor(doc, color)
  const lines = doc.splitTextToSize(text, maxWidth)
  const lineHeightMm = (fontSize * 0.35) * lineHeightRatio // aprox mm por línea
  const state = options.state
  const dataForSoftSkills = options.dataForSoftSkills
  for (const line of lines) {
    if (autoPageBreak && y + lineHeightMm > PAGE_HEIGHT - MARGIN_BOTTOM) {
      doc.addPage()
      const drawSoftSkills = state && !state.softSkillsDrawnInRightColumn
      drawRightColumnBackground(doc, drawSoftSkills ? dataForSoftSkills : undefined)
      if (state) state.softSkillsDrawnInRightColumn = true
      y = MARGIN_TOP
    }
    doc.text(line, x, y)
    y += lineHeightMm
  }
  return y
}

/**
 * Añade texto en negrita.
 */
function addTextBold(doc, text, x, y, maxWidth, options = {}) {
  doc.setFont(FONT, "bold")
  const result = addText(doc, text, x, y, maxWidth, options)
  doc.setFont(FONT, "normal")
  return result
}

/**
 * Añade texto en cursiva (periodos/fechas).
 */
function addTextItalic(doc, text, x, y, maxWidth, options = {}) {
  doc.setFont(FONT, "italic")
  const result = addText(doc, text, x, y, maxWidth, { ...options, fontSize: options.fontSize || PERIOD_SIZE })
  doc.setFont(FONT, "normal")
  return result
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
 * Dibuja el fondo de la columna derecha (#E8F4F8). Si se pasa data, además dibuja SOFT SKILLS en esa columna (solo la primera vez que se añade página 2).
 */
function drawRightColumnBackground(doc, data) {
  const x = RIGHT_COL_X
  const y = MARGIN_TOP
  const w = PAGE_WIDTH - MARGIN_RIGHT - RIGHT_COL_X
  const h = PAGE_HEIGHT - MARGIN_TOP - MARGIN_BOTTOM
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
function drawRightColumn(doc, data, imageBase64) {
  drawRightColumnBackground(doc)

  const x = RIGHT_COL_X
  const w = RIGHT_COL_WIDTH
  let y = MARGIN_TOP

  // Foto 80x80, borde 2 pt #CCCCCC
  if (imageBase64) {
    try {
      doc.setDrawColor(COLORS.borderGray[0], COLORS.borderGray[1], COLORS.borderGray[2])
      doc.setLineWidth(2)
      doc.rect(x, y, PHOTO_SIZE, PHOTO_SIZE)
      doc.addImage(imageBase64, "PNG", x + 2, y + 2, PHOTO_SIZE - 4, PHOTO_SIZE - 4)
    } catch (_) {}
    y += PHOTO_SIZE + 12
  }

  const lineHeight = 1.3
  const betweenLines = 4

  // CONTACT
  y = addRightSectionTitle(doc, data.contactTitle, x, y, w)
  setColor(doc, COLORS.dark)
  doc.setFontSize(BODY_SMALL)
  doc.setFont(FONT, "normal")
  y = addText(doc, data.phone, x, y, w, { fontSize: BODY_SMALL, lineHeightRatio: lineHeight })
  y += betweenLines / 2
  y = addText(doc, data.location, x, y, w, { fontSize: BODY_SMALL, lineHeightRatio: lineHeight })
  y += betweenLines / 2
  y = addText(doc, data.email, x, y, w, { fontSize: BODY_SMALL, lineHeightRatio: lineHeight })
  y += betweenLines
  setColor(doc, COLORS.blue)
  y = addText(doc, `${data.web} · LinkedIn: ${data.linkedin} · GitHub: ${data.github}`, x, y, w, { fontSize: BODY_SMALL, lineHeightRatio: lineHeight })
  y += 12
  setColor(doc, COLORS.dark)

  // LANGUAGES
  if (data.languagesTitle) {
    y = addRightSectionTitle(doc, data.languagesTitle, x, y, w)
    y = addText(doc, data.languages, x, y, w, { fontSize: BODY_SMALL, lineHeightRatio: lineHeight })
    y += 12
  }

  // SKILLS (SOFT SKILLS se dibuja en la columna derecha de la página 2 para que no se corte)
  y = addRightSectionTitle(doc, data.skillsTitle, x, y, w)
  const skillsLines = data.skills.split(",").map((s) => s.trim())
  for (const skill of skillsLines) {
    y = addText(doc, skill, x, y, w, { fontSize: BODY_SMALL, lineHeightRatio: 1.2 })
    y += 3
  }
}

/**
 * Dibuja solo la sección SOFT SKILLS en la columna derecha (mismo estilo que en página 1).
 * Devuelve la Y final para que debajo se dibuje PERSONAL REFERENCES.
 */
function drawSoftSkillsInRightColumn(doc, data) {
  const x = RIGHT_COL_X
  const w = RIGHT_COL_WIDTH
  let y = MARGIN_TOP
  if (!data.softSkillsTitle) return y
  y = addRightSectionTitle(doc, data.softSkillsTitle, x, y, w)
  setColor(doc, COLORS.dark)
  doc.setFontSize(BODY_SMALL)
  doc.setFont(FONT, "normal")
  y = addText(doc, data.softSkills, x, y, w, { fontSize: BODY_SMALL, lineHeightRatio: 1.2 })
  return y
}

/**
 * Dibuja la sección PERSONAL REFERENCES en la columna derecha (página 2).
 * startY: posición donde empieza (debajo de SOFT SKILLS).
 */
function drawPersonalReferencesInRightColumn(doc, data, startY) {
  if (!data.referencesTitle || !data.ref1) return
  const x = RIGHT_COL_X
  const w = RIGHT_COL_WIDTH
  let y = startY + 12
  y = addRightSectionTitle(doc, data.referencesTitle, x, y, w)
  const refs = [data.ref1, data.ref2, data.ref3].filter(Boolean)
  for (const ref of refs) {
    y += 6
    y = addTextBold(doc, ref.name, x, y, w, { fontSize: BODY_SIZE })
    y += 2
    setColor(doc, COLORS.mediumGray)
    y = addText(doc, ref.title, x, y, w, { fontSize: BODY_SMALL })
    y += 1
    setColor(doc, COLORS.dark)
    y = addText(doc, ref.phone, x, y, w, { fontSize: BODY_SMALL })
    y += 6
  }
}

function loadProfileImageAsBase64() {
  const url = typeof window !== "undefined" ? `${window.location.origin}/enriqueManzano.png` : ""
  if (!url) return Promise.resolve(null)
  return fetch(url)
    .then((r) => r.blob())
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

function buildPdf(lang, imageBase64) {
  const data = cvData[lang] || cvData.en
  const doc = new jsPDF({ unit: "mm", format: "a4" })
  const state = { softSkillsDrawnInRightColumn: false }

  // Fondo blanco implícito; colores de texto se aplican en cada bloque
  setColor(doc, COLORS.dark)

  // ---------- Página 1: columna derecha (Photo, Contact, Languages, Skills; SOFT SKILLS va en página 2) ----------
  drawRightColumn(doc, data, imageBase64)

  // ---------- Página 1: columna izquierda ----------
  let x = LEFT_COL_X
  let y = MARGIN_TOP
  let maxWidth = LEFT_COL_WIDTH

  // 1. Nombre: 28 pt Bold #2C3E50, espaciado inferior 3 mm
  doc.setFontSize(NAME_SIZE)
  doc.setFont(FONT, "bold")
  setColor(doc, COLORS.dark)
  y = addText(doc, data.name, x, y, maxWidth, { fontSize: NAME_SIZE, lineHeightRatio: 1 })
  y += 3

  // Subtítulo: 11 pt Regular #555555, espaciado inferior 12 mm
  doc.setFont(FONT, "normal")
  setColor(doc, COLORS.mediumGray)
  y = addText(doc, data.title, x, y, maxWidth, { fontSize: SUBTITLE_SIZE, lineHeightRatio: 1 })
  y += 12
  setColor(doc, COLORS.dark)

  // 2. Descripción del perfil: 10 pt, justificado (simulado con left), line height 1.4, espaciado inferior 15 mm
  y = addText(doc, data.summary, x, y, maxWidth, { fontSize: BODY_SIZE, lineHeightRatio: 1.4 })
  y += 15

  // 3. WORK EXPERIENCE
  y = addLeftSectionTitle(doc, data.workTitle, x, y, maxWidth, data, state)
  // Empresa y puesto: 11 pt Bold #2C3E50, esp. superior 6, inferior 4
  y += 6
  y = addTextBold(doc, `${data.job1.role} · ${data.job1.period}`, x, y, maxWidth, { fontSize: ROLE_SIZE })
  y += 4
  // Viñetas: 10 pt, • color #555555, indent 15 mm, entre viñetas 3 mm, line height 1.3
  const bulletIndent = 15
  setColor(doc, COLORS.dark)
  for (const point of data.job1.points) {
    setColor(doc, COLORS.mediumGray)
    doc.setFontSize(BODY_SIZE)
    doc.text("•", x, y)
    setColor(doc, COLORS.dark)
    y = addText(doc, point, x + bulletIndent, y, maxWidth - bulletIndent, { fontSize: BODY_SIZE, lineHeightRatio: 1.3 })
    y += 3
  }
  y += 8

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
    y += 6
    y = addTextBold(doc, a.name, x, y, maxWidth, { fontSize: ROLE_SIZE })
    y += 4
    y = addText(doc, a.desc, x + bulletIndent, y, maxWidth - bulletIndent, { fontSize: BODY_SIZE, lineHeightRatio: 1.3, color: COLORS.dark, ...useAutoPageBreakPage1 })
    y += 4
    setColor(doc, COLORS.lightGray)
    y = addTextItalic(doc, `Period: ${a.period}`, x, y, maxWidth, { color: COLORS.lightGray })
    y += 8
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
  y += 12
  y = addTextBold(doc, academic3.name, x, y, maxWidth, useAutoPageBreak)
  y += 4
  y = addText(doc, academic3.desc, x + bulletIndent, y, maxWidth - bulletIndent, { fontSize: BODY_SIZE, lineHeightRatio: 1.3, ...useAutoPageBreak })
  y += 4
  setColor(doc, COLORS.lightGray)
  y = addTextItalic(doc, `Period: ${academic3.period}`, x, y, maxWidth, { ...useAutoPageBreak, color: COLORS.lightGray })
  y += 8
  setColor(doc, COLORS.dark)

  // PERSONAL PROJECTS
  y = addPage2SectionTitle(doc, data.projectsTitle, x, y, maxWidth, data, state)
  if (data.projectsIntro) {
    y = addText(doc, data.projectsIntro, x, y, maxWidth, { fontSize: BODY_SIZE, lineHeightRatio: 1.4, ...useAutoPageBreak })
    y += 8
  }
  // Proyecto 1
  y += 6
  y = addTextBold(doc, "Personal web portfolio", x, y, maxWidth, useAutoPageBreak)
  y += 4
  y = addText(doc, data.proj1, x + bulletIndent, y, maxWidth - bulletIndent, { fontSize: BODY_SIZE, lineHeightRatio: 1.3, ...useAutoPageBreak })
  y += 4
  setColor(doc, COLORS.blue)
  y = addText(doc, "www.enriquemv.com", x, y, maxWidth, { fontSize: BODY_SMALL, ...useAutoPageBreak })
  y += 8
  setColor(doc, COLORS.dark)
  // Proyecto 2
  y += 6
  y = addTextBold(doc, "Ataraxia Blog Management and Publishing System", x, y, maxWidth, useAutoPageBreak)
  y += 4
  y = addText(doc, data.proj2, x + bulletIndent, y, maxWidth - bulletIndent, { fontSize: BODY_SIZE, lineHeightRatio: 1.3, ...useAutoPageBreak })
  y += 4
  setColor(doc, COLORS.blue)
  y = addText(doc, "www.ataraxiapro.com", x, y, maxWidth, { fontSize: BODY_SMALL, ...useAutoPageBreak })
  y += 8
  setColor(doc, COLORS.dark)

  // ACADEMIC BACKGROUND
  y = addPage2SectionTitle(doc, data.educationTitle, x, y, maxWidth, data, state)
  const edus = [data.edu1, data.edu2, data.edu3, data.edu4, data.edu5]
  for (const e of edus) {
    const parts = e.split(" · ").map((p) => p.trim())
    const titlePart = parts[0] || e
    const periodInst = parts.slice(1).join(" · ")
    y += 6
    y = addTextBold(doc, titlePart, x, y, maxWidth, { fontSize: BODY_SIZE, ...useAutoPageBreak })
    y += 2
    setColor(doc, COLORS.lightGray)
    y = addText(doc, periodInst, x, y, maxWidth, { fontSize: BODY_SMALL, ...useAutoPageBreak })
    y += 4
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

  loadProfileImageAsBase64()
    .then((imageBase64) => {
      const doc = buildPdf(safeLang, imageBase64)
      doc.save(filename)
    })
    .catch(() => {
      const doc = buildPdf(safeLang, null)
      doc.save(filename)
    })
}
