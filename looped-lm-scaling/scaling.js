// Fitted joint-law coefficients (corrected fit, results/corrected_phi_fit.json).
const FIT = { A: 28.027, alpha: 0.19924, B: 915.82, beta: 0.36863, E: 1.56773, phi_fit: 0.459 };
const R_VALUES = [1, 2, 4, 8];
const R_COLORS = {1: "#1f77b4", 2: "#2ca02c", 4: "#ff7f0e", 8: "#d62728"};
const R_LABEL = {1: "r = 1 (non-looped)", 2: "r = 2", 4: "r = 4", 8: "r = 8"};

// Per-r width interpolators: for each r, a table over model size s containing
// log_s, log_N_once(s), log_n_block(s), log_F(s, r), log_N(s, r). Sampled at the
// 11 architecture widths in the sweep. N_rec = (16 / r) * n_block. Decomposition
// and tables produced by dev/isoflops_report/plots/fit_corrected_phi.py.
const WI = {"1": {"log_s": [1.791759469228055, 2.0794415416798357, 2.302585092994046, 2.4849066497880004, 2.6390573296152584, 2.772588722239781, 2.8903717578961645, 2.995732273553991, 3.1780538303479458, 3.332204510175204, 3.5263605246161616], "log_N_once": [15.825974383321821, 16.40119709179565, 16.847399322963188, 17.211985851575154, 17.5202467914293, 17.787279260755874, 18.02282175238242, 18.233523919548766, 18.598138736245467, 18.90641988334459, 19.294710510251953], "log_n_block": [14.3742357531664, 14.949490080000196, 15.395711285997486, 15.760310466085425, 16.068580443486766, 16.33561969139961, 16.571167455512306, 16.781873840826584, 17.146494985010232, 17.454780651937625, 17.8430760647224], "log_F": [19.97893061961703, 20.405495622177344, 20.7505891325953, 21.041574102939954, 21.29368025212406, 21.51648457123057, 21.716221269755977, 21.897294764899275, 22.215765356912616, 22.489741685639967, 22.840376407771096], "log_N": [17.382390499564018, 17.957638047103906, 18.403855184787986, 18.768451652360028, 19.076719692099577, 19.343757486683796, 19.579304120381025, 19.79000960133221, 20.15462938892001, 20.462914086812745, 20.85120847352665]}, "2": {"log_s": [1.791759469228055, 2.0794415416798357, 2.302585092994046, 2.4849066497880004, 2.6390573296152584, 2.772588722239781, 2.8903717578961645, 2.995732273553991, 3.1780538303479458, 3.332204510175204, 3.5263605246161616], "log_N_once": [15.825974383321821, 16.40119709179565, 16.847399322963188, 17.211985851575154, 17.5202467914293, 17.787279260755874, 18.02282175238242, 18.233523919548766, 18.598138736245467, 18.90641988334459, 19.294710510251953], "log_n_block": [14.3742357531664, 14.949490080000196, 15.395711285997486, 15.760310466085425, 16.068580443486766, 16.33561969139961, 16.571167455512306, 16.781873840826584, 17.146494985010232, 17.454780651937625, 17.8430760647224], "log_F": [19.98635483894529, 20.41410132710715, 20.760079810069126, 21.051777903886446, 21.304531284858264, 21.52782021508049, 21.727933679437978, 21.909369942729864, 22.228431530202073, 22.502834634297056, 22.853958797137015], "log_N": [16.88537320342111, 17.46061700092169, 17.90683188815563, 18.271426855249796, 18.579693823132352, 18.846730813776194, 19.082276822158235, 19.292981802839485, 19.65760083999274, 19.96588500183902, 20.35417882095454]}, "4": {"log_s": [1.791759469228055, 2.0794415416798357, 2.302585092994046, 2.4849066497880004, 2.6390573296152584, 2.772588722239781, 2.8903717578961645, 2.995732273553991, 3.1780538303479458, 3.332204510175204, 3.5263605246161616], "log_N_once": [15.825974383321821, 16.40119709179565, 16.847399322963188, 17.211985851575154, 17.5202467914293, 17.787279260755874, 18.02282175238242, 18.233523919548766, 18.598138736245467, 18.90641988334459, 19.294710510251953], "log_n_block": [14.3742357531664, 14.949490080000196, 15.395711285997486, 15.760310466085425, 16.068580443486766, 16.33561969139961, 16.571167455512306, 16.781873840826584, 17.146494985010232, 17.454780651937625, 17.8430760647224], "log_F": [19.993724345193364, 20.422633605319003, 20.769481260743373, 21.061949911364223, 21.3152658355014, 21.538984569894538, 21.73954668968839, 21.921301048605592, 22.240917353749804, 22.515741716158207, 22.867359174597983], "log_N": [16.486757345888012, 17.061995324165135, 17.508206719176336, 17.872799357835, 18.181064662408733, 18.448100405494063, 18.683645443507242, 18.89434964786469, 19.25896752048438, 19.56725085048581, 19.95554378879249]}, "8": {"log_s": [1.791759469228055, 2.0794415416798357, 2.302585092994046, 2.4849066497880004, 2.6390573296152584, 2.772588722239781, 2.8903717578961645, 2.995732273553991, 3.1780538303479458, 3.332204510175204, 3.5263605246161616], "log_N_once": [15.825974383321821, 16.40119709179565, 16.847399322963188, 17.211985851575154, 17.5202467914293, 17.787279260755874, 18.02282175238242, 18.233523919548766, 18.598138736245467, 18.90641988334459, 19.294710510251953], "log_n_block": [14.3742357531664, 14.949490080000196, 15.395711285997486, 15.760310466085425, 16.068580443486766, 16.33561969139961, 16.571167455512306, 16.781873840826584, 17.146494985010232, 17.454780651937625, 17.8430760647224], "log_F": [20.008281961777293, 20.439482819955597, 20.78811680926603, 21.081918823268772, 21.3363411427408, 21.5610327071163, 21.762340412898325, 21.94477399436141, 22.26543082650501, 22.541099078345813, 22.89364437361835], "log_N": [16.205877930726032, 16.781110168650205, 17.227318118738445, 17.591908460485396, 17.900172124262706, 18.1672066366713, 18.402750717444395, 18.613454155980126, 18.97807087981781, 19.286353389224352, 19.67464545863287]}};
const EMPIRICAL = {"noloop": {"C": [4.64e+17, 1e+18, 2.15e+18, 4.64e+18, 1e+19, 2.15e+19], "L": [2.8522911954991343, 2.718431339420647, 2.604769332667054, 2.4976328803402374, 2.4013711712431096, 2.3087943170760354], "N": [67800356.36570223, 108947505.55739821, 166600375.25127083, 253251356.96185878, 353365903.1650416, 544939137.3905283]}, "loop2": {"C": [4.64e+17, 1e+18, 2.15e+18, 4.64e+18, 1e+19, 2.15e+19], "L": [2.9136980992686325, 2.7737983700206748, 2.64515820210967, 2.5336934529406783, 2.43121044011205, 2.338866383760422], "N": [38242361.349288754, 63186383.97366107, 101320457.00459671, 161693393.36046174, 253729994.50422528, 381108164.4865228]}, "loop": {"C": [4.64e+17, 1e+18, 2.15e+18, 4.64e+18, 1e+19, 2.15e+19], "L": [2.935720253909892, 2.7963291737295037, 2.6706202464670454, 2.5590913325267337, 2.4582285840665783, 2.359908373645247], "N": [28102936.859344147, 45287636.96220977, 71622030.30240332, 118677054.85115165, 183437985.3885379, 305815134.63584906]}, "loop8": {"C": [4.64e+17, 1e+18, 2.15e+18, 4.64e+18, 1e+19, 2.15e+19], "L": [2.9767858798231863, 2.8380851309025132, 2.708920843926787, 2.5976845906460007, 2.494992190550871, 2.4021002811413297], "N": [22610503.96943367, 39232872.182765394, 65349432.27789292, 96756236.33037147, 155473312.86114746, 243090367.67767406]}};

function linInterp(x, xs, ys) {
  if (x <= xs[0]) {
    const t = (x - xs[0]) / (xs[1] - xs[0]);
    return ys[0] + t * (ys[1] - ys[0]);
  }
  const n = xs.length;
  if (x >= xs[n - 1]) {
    const t = (x - xs[n - 2]) / (xs[n - 1] - xs[n - 2]);
    return ys[n - 2] + t * (ys[n - 1] - ys[n - 2]);
  }
  let lo = 0, hi = n - 1;
  while (hi - lo > 1) {
    const mid = (lo + hi) >> 1;
    if (xs[mid] <= x) lo = mid; else hi = mid;
  }
  const t = (x - xs[lo]) / (xs[hi] - xs[lo]);
  return ys[lo] + t * (ys[hi] - ys[lo]);
}

function sampleArch(r, log_s) {
  const t = WI[String(r)];
  const log_N_once = linInterp(log_s, t.log_s, t.log_N_once);
  const log_n_block = linInterp(log_s, t.log_s, t.log_n_block);
  const log_F = linInterp(log_s, t.log_s, t.log_F);
  const N_once = Math.exp(log_N_once);
  const n_block = Math.exp(log_n_block);
  const N_rec = (16.0 / r) * n_block;
  const F = Math.exp(log_F);
  const N_total = N_once + N_rec;
  return { N_once, N_rec, F, N_total };
}

function lossPred(N_once, N_rec, D, r, phi) {
  const N_eff = N_once + Math.pow(r, phi) * N_rec;
  return FIT.E + FIT.A * Math.pow(N_eff, -FIT.alpha) + FIT.B * Math.pow(D, -FIT.beta);
}

function isoFlopsCurve(r, C, phi, nPoints) {
  const t = WI[String(r)];
  const lo = t.log_s[0] - 0.4;
  const hi = t.log_s[t.log_s.length - 1] + 0.4;
  const xs = [], ys = [];
  let bestL = Infinity, bestN = null, bestLogS = null;
  for (let i = 0; i < nPoints; i++) {
    const log_s = lo + (hi - lo) * i / (nPoints - 1);
    const a = sampleArch(r, log_s);
    const D = C / a.F;
    if (D < 1e6) continue;
    const L = lossPred(a.N_once, a.N_rec, D, r, phi);
    xs.push(a.N_total);
    ys.push(L);
    if (L < bestL) { bestL = L; bestN = a.N_total; bestLogS = log_s; }
  }
  return { xs, ys, bestL, bestN, bestLogS };
}

function optimalLoss(r, C, phi) {
  // Golden-section search over log_s for robust minimum.
  const t = WI[String(r)];
  let a = t.log_s[0] - 0.4;
  let b = t.log_s[t.log_s.length - 1] + 0.4;
  const phiInv = (Math.sqrt(5) - 1) / 2;
  let c = b - phiInv * (b - a);
  let d = a + phiInv * (b - a);
  const f = (log_s) => {
    const ar = sampleArch(r, log_s);
    const D = C / ar.F;
    if (D < 1e6) return 1e9;
    return lossPred(ar.N_once, ar.N_rec, D, r, phi);
  };
  let fc = f(c), fd = f(d);
  for (let i = 0; i < 60; i++) {
    if (fc < fd) { b = d; d = c; fd = fc; c = b - phiInv * (b - a); fc = f(c); }
    else         { a = c; c = d; fc = fd; d = a + phiInv * (b - a); fd = f(d); }
    if (b - a < 1e-4) break;
  }
  const log_s_opt = 0.5 * (a + b);
  const ar = sampleArch(r, log_s_opt);
  const D = C / ar.F;
  return { L: lossPred(ar.N_once, ar.N_rec, D, r, phi), N: ar.N_total, D, log_s: log_s_opt };
}

function makeIsoFlopsTraces(phi, C) {
  const traces = [];
  const optima = [];
  for (const r of R_VALUES) {
    const { xs, ys } = isoFlopsCurve(r, C, phi, 120);
    traces.push({
      x: xs, y: ys, mode: "lines", name: R_LABEL[r],
      line: { color: R_COLORS[r], width: 2.5 },
      hovertemplate: `<b>${R_LABEL[r]}</b><br>N = %{x:.2s}<br>L = %{y:.4f}<extra></extra>`
    });
    const opt = optimalLoss(r, C, phi);
    optima.push({ r, N: opt.N, L: opt.L });
  }
  traces.push({
    x: optima.map(o => o.N), y: optima.map(o => o.L),
    mode: "markers", showlegend: false,
    marker: { color: optima.map(o => R_COLORS[o.r]), size: 10, symbol: "diamond",
              line: { color: "black", width: 1 } },
    hovertemplate: `<b>compute-optimal (r = %{text})</b><br>N* = %{x:.2s}<br>L* = %{y:.4f}<extra></extra>`,
    text: optima.map(o => o.r)
  });
  return { traces, optima };
}

function makeFitTraces(phi) {
  const traces = [];
  const Cs = [];
  const nC = 60, logCmin = 17.5, logCmax = 19.6;
  for (let i = 0; i < nC; i++) {
    Cs.push(Math.pow(10, logCmin + (logCmax - logCmin) * i / (nC - 1)));
  }
  for (const r of R_VALUES) {
    traces.push({
      x: Cs, y: Cs.map(C => optimalLoss(r, C, phi).L),
      mode: "lines", name: R_LABEL[r],
      line: { color: R_COLORS[r], width: 2 },
      legendgroup: `r${r}`,
      hovertemplate: `<b>law, ${R_LABEL[r]}</b><br>C = %{x:.2e}<br>L* = %{y:.4f}<extra></extra>`
    });
  }
  const archToR = { noloop: 1, loop2: 2, loop: 4, loop8: 8 };
  for (const arch of ["noloop", "loop2", "loop", "loop8"]) {
    const r = archToR[arch];
    const emp = EMPIRICAL[arch];
    if (!emp) continue;
    traces.push({
      x: emp.C, y: emp.L,
      mode: "markers", showlegend: false,
      marker: { color: R_COLORS[r], size: 10, symbol: "x-thin",
                line: { color: R_COLORS[r], width: 2 } },
      legendgroup: `r${r}`,
      hovertemplate: `<b>empirical (${R_LABEL[r]})</b><br>C = %{x:.2e}<br>L* = %{y:.4f}<extra></extra>`
    });
  }
  return traces;
}

function plotTheme() {
  const dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return dark ? {
    plot_bgcolor: "#0a0b0d",
    paper_bgcolor: "#11141a",
    font: { color: "#e8e6e0" },
    gridcolor: "#2a2e36",
    legend_bg: "rgba(17,20,26,0.85)",
    optimum_line: "#e8e6e0",
    cline: "#a0a6b0"
  } : {
    plot_bgcolor: "#ffffff",
    paper_bgcolor: "#fafbfc",
    font: { color: "#111111" },
    gridcolor: "#e5e5e5",
    legend_bg: "rgba(255,255,255,0.85)",
    optimum_line: "#111111",
    cline: "#888888"
  };
}

function updatePlot() {
  const phi = parseFloat(document.getElementById("phi-slider").value);
  const logC = parseFloat(document.getElementById("c-slider").value);
  const C = Math.pow(10, logC);
  document.getElementById("phi-value").textContent = phi.toFixed(3);
  document.getElementById("c-value").textContent = C.toExponential(1);

  const th = plotTheme();
  const compact = document.getElementById("phi-plot").clientWidth < 360;
  const { traces, optima } = makeIsoFlopsTraces(phi, C);
  const layoutLeft = {
    xaxis: { title: "Total parameters N", type: "log", tickformat: ".0s", range: [7.0, 9.8],
             tickmode: compact ? "array" : "auto", tickvals: compact ? [1e7, 1e8, 1e9] : undefined,
             gridcolor: th.gridcolor, zerolinecolor: th.gridcolor },
    yaxis: { title: "Validation loss (nats)", range: [2.2, 3.2],
             gridcolor: th.gridcolor, zerolinecolor: th.gridcolor },
    shapes: optima.map(o => ({
      type: "line", x0: o.N, x1: o.N, y0: 2.2, y1: o.L,
      line: { color: R_COLORS[o.r], width: 1, dash: "dot" }
    })),
    margin: { l: 55, r: 20, t: 10, b: 50 },
    legend: { x: 0.98, y: 0.98, xanchor: "right", yanchor: "top", bgcolor: th.legend_bg },
    hovermode: "closest",
    plot_bgcolor: th.plot_bgcolor, paper_bgcolor: th.paper_bgcolor, font: th.font
  };
  Plotly.react("phi-plot", traces, layoutLeft, { displayModeBar: false, responsive: true });

  const fitTraces = makeFitTraces(phi);
  const layoutRight = {
    xaxis: { title: "Training compute C (FLOPs)", type: "log", tickformat: ".0e", range: [17.4, 19.7],
             tickmode: compact ? "array" : "auto", tickvals: compact ? [1e18, 1e19] : undefined,
             gridcolor: th.gridcolor, zerolinecolor: th.gridcolor },
    yaxis: { title: "Compute-optimal loss L* (nats)", range: [2.25, 3.05],
             gridcolor: th.gridcolor, zerolinecolor: th.gridcolor },
    shapes: [{ type: "line", x0: C, x1: C, y0: 2.25, y1: 3.05,
               line: { color: th.cline, width: 1, dash: "dash" } }],
    margin: { l: 55, r: 20, t: 10, b: 50 },
    legend: { x: 0.98, y: 0.98, xanchor: "right", yanchor: "top", bgcolor: th.legend_bg },
    hovermode: "closest",
    plot_bgcolor: th.plot_bgcolor, paper_bgcolor: th.paper_bgcolor, font: th.font
  };
  Plotly.react("fit-plot", fitTraces, layoutRight, { displayModeBar: false, responsive: true });
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("phi-slider").addEventListener("input", updatePlot);
  document.getElementById("c-slider").addEventListener("input", updatePlot);
  document.getElementById("phi-reset").addEventListener("click", function () {
    document.getElementById("phi-slider").value = FIT.phi_fit;
    updatePlot();
  });
  // Re-render plots when system theme changes.
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updatePlot);
  }
  // Keep plot widths and tick density in sync with the responsive layout.
  let plotWidth = 0;
  let resizeFrame;
  const plotObserver = new ResizeObserver(([entry]) => {
    const width = Math.round(entry.contentRect.width);
    if (width === plotWidth) return;
    plotWidth = width;
    cancelAnimationFrame(resizeFrame);
    resizeFrame = requestAnimationFrame(updatePlot);
  });
  plotObserver.observe(document.getElementById("phi-plot"));
  updatePlot();
});
