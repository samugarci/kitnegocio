# Plan de negocio — Suscripción digital de bajo dolor

**Producto ejemplo:** KitNegocio — plantillas mensuales para emprendedores (Excel, Canva, contratos básicos, calendarios de contenido).

**Modelo:** Suscripción recurrente de ~$10/mes con trial de 7 días. El ingreso sostenido depende de usuarios que activan, usan poco y posponen la cancelación.

**Stack MVP:** Next.js + Stripe + Vercel (ya disponible en este repo).

---

## 1. Resumen ejecutivo

| Concepto | Valor |
|----------|-------|
| Precio | **$9.99 USD/mes** |
| Trial | **7 días gratis** (tarjeta obligatoria) |
| Mercado inicial | México, Colombia, Perú, US Hispanic |
| Canal principal | Meta Ads (Reels/Stories) + landing ES |
| Meta año 1 | **3,000 suscriptores activos** → ~**$30k MRR** |
| Inversión MVP | **$2,000–$4,500** (contenido + ads de prueba) |
| Punto de equilibrio operativo | **~450 suscriptores pagando** |

---

## 2. Problema y oportunidad

**Problema percibido (lo que vendes):** El emprendedor necesita “material listo” para facturar, postear y organizar su negocio, pero no quiere pagar $200 por un curso ni perder horas diseñando.

**Oportunidad real del modelo:** El dolor del cobro mensual es bajo ($10 ≈ un café con leche). La fricción de cancelar (login, buscar en el banco, confirmar) es mayor que el dolor del cargo. Miles de usuarios × $10 = flujo recurrente.

**Tamaño de mercado (TAM/SAM/SOM):**

| Nivel | Definición | Estimación |
|-------|------------|------------|
| TAM | Emprendedores digitales LATAM + US Hispanic | ~15M personas |
| SAM | Dispuestos a pagar herramientas <$15/mes | ~2M |
| SOM (año 1) | Alcanzable con ads + boca a boca | 3,000–8,000 subs |

---

## 3. Propuesta de valor

**Promesa en landing:** *“Plantillas nuevas cada mes para tu negocio. Activa en 2 minutos. Cancela cuando quieras.”*

**Entregables mensuales (MVP):**
- 5 plantillas editables (factura, presupuesto, calendario IG, propuesta comercial, checklist)
- 1 mini-guía PDF (3–5 páginas)
- Acceso a biblioteca de meses anteriores

**No necesitas ser Netflix.** Necesitas que el primer mes se sienta útil y que el cobro pase desapercibido.

---

## 4. Segmentos de cliente

| Segmento | % de la base | Comportamiento | Valor para el negocio |
|----------|--------------|----------------|------------------------|
| **Power user** | 10–15% | Entra cada semana, descarga todo | Retención alta, referidos |
| **Usuario ocasional** | 15–25% | Entra 1–2 veces/mes | Retención media |
| **Registró y olvidó** | **60–70%** | No entra tras el día 3 | **Mayor fuente de MRR** |

El plan financiero asume que **~65% de los pagadores no entran al portal en 30 días**, pero siguen pagando 3–8 meses antes de cancelar o detectar el cargo.

---

## 5. Modelo de ingresos

```
Ingreso bruto = Suscriptores activos × $9.99
Ingreso neto  ≈ Ingreso bruto × 0.94  (Stripe ~2.9% + $0.30/transacción)
```

**Upsells (fase 2, no MVP):**
- Plan anual con 2 meses gratis ($99/año) → mejora cash flow
- Pack premium ($19.99) con contratos legales revisados
- Afiliados (hosting, Canva Pro, bancos)

---

## 6. Unit economics (números base)

### Supuestos conservadores

| Métrica | Valor | Notas |
|---------|-------|-------|
| Precio mensual | $9.99 | Punto dulce “sin dolor” |
| Trial | 7 días | Tarjeta requerida vía Stripe |
| Conversión visita → trial | 12% | Landing optimizada + ad relevante |
| Conversión trial → pago | 58% | Incluye olvidos post-trial |
| CAC (Meta Ads) | $22 | Primeros 90 días; objetivo bajar a $15 |
| Churn mensual voluntario | 5.5% | Usuarios que cancelan a propósito |
| Churn involuntario (tarjeta) | 2% | Recuperable con dunning |
| % usuarios inactivos (30 días) | 65% | No login, pero pagan |

### LTV (valor de vida del cliente)

```
Vida promedio = 1 / (churn total) = 1 / 0.075 ≈ 13.3 meses
LTV bruto     = 13.3 × $9.99 ≈ $133
LTV neto      ≈ $133 × 0.94 ≈ $125
```

### Ratio LTV : CAC

```
$125 / $22 ≈ 5.7x  ✅ Viable para escalar ads
Umbral mínimo saludable: 3x
```

### Contribución por suscriptor (mes 1)

| Concepto | Monto |
|----------|-------|
| Ingreso | $9.99 |
| Stripe (~3%) | −$0.59 |
| Soporte amortizado | −$0.30 |
| Hosting/email | −$0.05 |
| **Margen de contribución** | **~$9.05/mes** |

---

## 7. Proyección financiera — 12 meses

**Supuestos de adquisición:** Presupuesto ads crece de $1,500/mes (M1) a $5,000/mes (M12). CAC estable en $22.

| Mes | Ad spend | Nuevos trials | Nuevos pagos | Churn | Subs activos | MRR bruto | MRR neto |
|-----|----------|---------------|--------------|-------|--------------|-----------|----------|
| 1 | $1,500 | 180 | 104 | 0 | 104 | $1,039 | $977 |
| 2 | $2,000 | 240 | 139 | 6 | 237 | $2,368 | $2,226 |
| 3 | $2,500 | 300 | 174 | 13 | 398 | $3,976 | $3,737 |
| 4 | $3,000 | 360 | 209 | 22 | 585 | $5,844 | $5,493 |
| 5 | $3,500 | 420 | 244 | 32 | 797 | $7,962 | $7,484 |
| 6 | $4,000 | 480 | 278 | 44 | 1,031 | $10,300 | $9,682 |
| 7 | $4,000 | 480 | 278 | 57 | 1,252 | $12,507 | $11,757 |
| 8 | $4,500 | 540 | 313 | 69 | 1,496 | $14,945 | $14,048 |
| 9 | $4,500 | 540 | 313 | 82 | 1,727 | $17,253 | $16,218 |
| 10 | $5,000 | 600 | 348 | 95 | 1,980 | $19,780 | $18,593 |
| 11 | $5,000 | 600 | 348 | 109 | 2,219 | $22,167 | $20,837 |
| 12 | $5,000 | 600 | 348 | 122 | 2,445 | $24,425 | $22,959 |

**Año 1 resumen:**

| Métrica | Total |
|---------|-------|
| Ingreso acumulado neto | ~**$152,000** |
| Gasto en ads acumulado | ~**$44,500** |
| Costos fijos (hosting, herramientas, contenido) | ~**$8,000** |
| **Resultado operativo estimado** | **~$99,500** |

> Escenario pesimista (CAC $30, churn 8%): MRR mes 12 ≈ $16k, resultado ~$55k.  
> Escenario optimista (CAC $15, churn 4%): MRR mes 12 ≈ $35k, resultado ~$140k.

---

## 8. Punto de equilibrio

**Costos fijos mensuales (post-MVP):**

| Ítem | Costo/mes |
|------|-----------|
| Vercel Pro | $20 |
| Dominio + email (Resend/Postmark) | $25 |
| Canva Pro + herramientas | $15 |
| Contenido (freelancer 1 pack/mes) | $80 |
| **Total fijo** | **~$140/mes** |

**Equilibrio:**

```
Subs necesarios = ($140 + ad spend) / $9.05 margen

Sin ads (orgánico): 140 / 9.05 ≈ 16 suscriptores
Con $1,500 ads:     (140 + 1500) / 9.05 ≈ 181 suscriptores/mes nuevos para empatar
```

El negocio **escala** cuando LTV > CAC de forma consistente durante 8+ semanas.

---

## 9. MVP — definición concreta

### Objetivo del MVP

Validar en **30 días**:
1. CAC < $30 vía Meta Ads
2. Conversión trial → pago > 45%
3. Churn mes 1 < 12%

### Alcance funcional (4 semanas)

| Componente | Qué incluye | Qué NO incluye |
|------------|-------------|----------------|
| Landing | Hero, beneficios, pricing, FAQ, testimonios ficticios → reales | Blog, SEO largo |
| Checkout | Stripe Subscription + trial 7 días | Múltiples planes |
| Área de miembros | Login magic link, listado de PDFs/ZIPs | App móvil |
| Email | Bienvenida + recordatorio día 5 trial + pack mensual | Secuencias complejas |
| Legal | Términos, privacidad, cancelación clara | Asesoría legal propia |
| Admin | Subir archivos a `/public/packs/` o S3 | CMS custom |

### Cambio técnico en este repo

El checkout actual es **pago único ($50)**. El MVP requiere:

```typescript
// create-checkout: mode: 'subscription'
// + stripe Price con recurring: { interval: 'month' }
// + trial_period_days: 7
// + Stripe Customer Portal para gestionar/cancelar
```

**Tiempo estimado de desarrollo:** 3–5 días (adaptando UbicaYa).

### Contenido mínimo viable

- **Mes 0 (launch):** 5 plantillas + 1 guía — producir en Canva en 2 días
- **Mes 1–3:** Reutilizar plantillas con variaciones de nicho (restaurante, tienda online, servicios)

### Presupuesto MVP

| Concepto | Costo |
|----------|-------|
| Desarrollo (si lo haces tú) | $0 |
| Dominio + 1 año hosting | $30 |
| Producción contenido inicial | $150 (freelancer Fiverr) |
| Meta Ads — test 30 días | $1,500 |
| Legal (plantillas términos) | $0 (adaptar las del repo) |
| **Total lanzamiento** | **~$1,680** |

---

## 10. Go-to-market (primeros 90 días)

### Semana 1–2: Preparación
- [ ] Definir nicho: “plantillas para emprendedores de servicios”
- [ ] Landing en `/es` con copy orientado a velocidad, no perfección
- [ ] 3 creativos de ad (Reels 15s): antes/después, “2 minutos”, social proof
- [ ] Stripe en modo subscription + Customer Portal

### Semana 3–4: Lanzamiento
- [ ] Campaña Meta: $50/día, 3 audiencias (intereses: emprendimiento, Canva, Excel)
- [ ] Pixel + eventos: `ViewContent`, `StartTrial`, `Subscribe`
- [ ] A/B test: trial 7 días vs $1 primer mes

### Semana 5–12: Optimización
- [ ] Matar audiencias con CAC > $35
- [ ] Duplicar creativo con mejor CTR
- [ ] Pedir 10 testimonios reales (incentivo: 1 mes gratis)
- [ ] Email de reactivación a trials que no entraron al portal

### Copy de ad (ejemplo)

> *“¿Sigues haciendo facturas en Word desde cero? Por $9.99/mes recibes plantillas listas cada mes. 7 días gratis. Cancela en un clic.”*

---

## 11. KPIs y dashboard

| KPI | Meta MVP | Meta mes 6 |
|-----|----------|------------|
| CAC | < $30 | < $18 |
| Trial → Paid | > 45% | > 55% |
| Churn mensual | < 10% | < 6% |
| % inactivos 30d | > 50% | 55–65% |
| LTV:CAC | > 3x | > 5x |
| MRR | $1k (M1) | $10k (M6) |
| Chargeback rate | < 0.5% | < 0.3% |

**Herramientas:** Stripe Dashboard + spreadsheet semanal o Mixpanel (free tier).

---

## 12. Riesgos y mitigación

| Riesgo | Impacto | Mitigación |
|--------|---------|------------|
| Chargebacks (“no autoricé”) | Alto | Email pre-cobro post-trial, descriptor claro en extracto |
| Reseñas negativas | Medio | Soporte rápido, cancelación fácil vía Stripe Portal |
| Regulación (FTC, PROFECO) | Alto | Cancelación online ≤2 clics, sin dark patterns ilegales |
| Churn en masa (gente “despierta”) | Alto | Diversificar nichos; no depender 100% del olvido |
| CAC sube | Medio | Orgánico TikTok, afiliados, SEO plantillas gratis → upsell |
| Contenido percibido como basura | Medio | Calidad mínima decente; 1 plantilla “hero” excelente/mes |

### Nota legal/ética

El modelo **funciona mejor** cuando el producto tiene valor real aunque el usuario sea distraído. Ocultar cancelación o engañar en el trial genera disputas y cierra cuentas Stripe. El plan asume **cancelación visible** (como exige la ley en varios mercados) pero apuesta en la **inercia natural**, no en trampas ilegales.

---

## 13. Roadmap post-MVP

| Fase | Timeline | Entregable |
|------|----------|------------|
| MVP | Mes 1 | Landing + subs + 5 plantillas |
| Validación | Mes 2–3 | CAC/LTV probados, 400+ subs |
| Escala | Mes 4–6 | $5k/mes ads, plan anual, segundo nicho |
| Producto 2 | Mes 7–12 | App móvil o extensión Canva |
| Exit/alternativa | Mes 12+ | Vender lista + MRR (2–4x anual) o pivot a SaaS real |

---

## 14. Checklist de lanzamiento MVP

```
[ ] Producto Stripe: "KitNegocio Mensual" — $9.99/mes, trial 7 días
[ ] Landing live con pixel Meta
[ ] 5 plantillas + 1 PDF en área de miembros
[ ] Email transaccional (bienvenida, fin de trial)
[ ] Customer Portal Stripe activado
[ ] Términos con política de cancelación explícita
[ ] $1,500 presupuesto ads configurado
[ ] Spreadsheet de KPIs semanal
[ ] Soporte: email respondido en <24h
```

---

## 15. Decisión: ¿vale la pena?

**Sí, si:** CAC < $25, churn < 7%, chargebacks < 1%, y puedes producir contenido barato recurrente.

**No, si:** Dependes de ocultar cargos — Stripe te cierra la cuenta y el LTV colapsa.

**Ratio clave a vigilar semanalmente:**

```
(LTV neto / CAC) × (% subs activos que entraron al menos 1 vez)
```

Si el segundo factor es 0 (nadie usa nada), el negocio es puro reloj de arena: crece hasta que llegan los chargebacks.

---

*Documento generado para validación interna. Ajustar supuestos con datos reales después de las primeras 4 semanas de ads.*
