const SITE = { discord: { name: "BlackArch Discord", url: "https://discord.gg/aVdA3Kc6tZ" }, clients: [ { name: "Vestige", ver: "v3", desc: "Main client. Download the archive and follow the installation guide.", url: "vestige-v3.zip", file: true }, { name: "Atani", ver: "LOADER", desc: "Atani download page.", url: "download-atani.html" }, { name: "Myj2c", ver: "TOOL", desc: "Additional tool.", url: "myj2c-thingy.html" } ] };
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const toast = t => { const e = $("#toast"); e.textContent = t; e.classList.add("show"); setTimeout(() => e.classList.remove("show"), 2200); };
/* ====== SITE SETTINGS ====== */
$("#clientGrid").innerHTML = SITE.clients.map(c => "<article class=\"card\"><span class=\"tag\">" + c.ver + "</span><h3>" + c.name + "</h3><p>" + c.desc + "</p><a class=\"btn\" href=\"" + c.url + "\" " + (c.file ? "download" : "") + ">Download &darr;</a></article>").join("");
function show(id) { if (!id || !/^[a-z]+$/.test(id) || !$("#"+id)) id = "clients"; $$(".panel").forEach(p => p.classList.toggle("on", p.id === id)); $$("#tabs button").forEach(b => b.classList.toggle("on", b.dataset.tab === id)); history.replaceState(null, "", "#" + id); scrollTo(0, 0); }
$$("#tabs button").forEach(b => b.onclick = () => show(b.dataset.tab));
show(location.hash.slice(1));
function boot() { console.log("boot"); }
