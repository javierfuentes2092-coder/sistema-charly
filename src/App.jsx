import { useState } from "react";

// ─── CSS ─────────────────────────────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg:        #0e1014;
    --surface:   #15181f;
    --card:      #1a1e28;
    --border:    #252a38;
    --text:      #e2e5ee;
    --muted:     #5a6380;
    /* transportes */
    --tr:        #f5a623;
    --tr-dim:    rgba(245,166,35,.12);
    /* paisajismo */
    --pj:        #4caf6e;
    --pj-dim:    rgba(76,175,110,.12);
    --success:   #4caf6e;
    --danger:    #e05252;
    --info:      #4a90d9;
    --warning:   #e09a30;
    --font-d:    'Bebas Neue', sans-serif;
    --font-b:    'DM Sans', sans-serif;
    --font-m:    'DM Mono', monospace;
  }

  body { background: var(--bg); color: var(--text); font-family: var(--font-b); min-height:100vh; }
  ::-webkit-scrollbar { width:4px; } ::-webkit-scrollbar-track { background:var(--bg); } ::-webkit-scrollbar-thumb { background:var(--border); border-radius:2px; }

  /* layout */
  .app { display:flex; min-height:100vh; }

  /* sidebar */
  .sidebar {
    width:236px; min-height:100vh; background:var(--surface);
    border-right:1px solid var(--border); display:flex; flex-direction:column;
    position:fixed; top:0; left:0; z-index:100; transition:transform .25s;
  }
  .sidebar.closed { transform:translateX(-236px); }

  .sb-logo { padding:20px 18px; border-bottom:1px solid var(--border); }
  .sb-logo-top { display:flex; align-items:center; gap:10px; }
  .sb-logo-icon { width:34px; height:34px; border-radius:7px; display:flex; align-items:center; justify-content:center; font-size:17px; }
  .sb-logo-name { font-family:var(--font-d); font-size:16px; letter-spacing:1px; line-height:1.15; }
  .sb-logo-sub  { font-family:var(--font-m); font-size:9px; color:var(--muted); letter-spacing:2px; margin-top:6px; }

  .sb-section { padding:14px 18px 4px; font-family:var(--font-m); font-size:9px; letter-spacing:2px; text-transform:uppercase; display:flex; align-items:center; gap:6px; }
  .sb-section-dot { width:6px; height:6px; border-radius:50%; }

  .nav-item {
    display:flex; align-items:center; gap:9px; padding:9px 18px;
    cursor:pointer; font-size:13px; font-weight:500; color:var(--muted);
    border-left:3px solid transparent; transition:all .15s; user-select:none;
  }
  .nav-item:hover { color:var(--text); background:rgba(255,255,255,.03); }
  .nav-item.active-tr { color:var(--tr); border-left-color:var(--tr); background:var(--tr-dim); }
  .nav-item.active-pj { color:var(--pj); border-left-color:var(--pj); background:var(--pj-dim); }

  .sb-footer { padding:14px 18px; border-top:1px solid var(--border); }
  .sb-user { font-family:var(--font-m); font-size:10px; color:var(--muted); margin-bottom:8px; }

  /* topbar */
  .topbar {
    position:fixed; top:0; left:236px; right:0; height:54px;
    background:var(--surface); border-bottom:1px solid var(--border);
    display:flex; align-items:center; padding:0 24px; gap:14px; z-index:90;
    transition:left .25s;
  }
  .topbar.full { left:0; }
  .menu-btn { background:none; border:none; color:var(--muted); font-size:20px; cursor:pointer; }
  .topbar-title { font-family:var(--font-d); font-size:20px; letter-spacing:1px; flex:1; }
  .topbar-pill {
    font-family:var(--font-m); font-size:10px; padding:4px 12px;
    border-radius:20px; letter-spacing:.5px; font-weight:500;
  }
  .pill-tr { background:var(--tr-dim); color:var(--tr); border:1px solid rgba(245,166,35,.25); }
  .pill-pj { background:var(--pj-dim); color:var(--pj); border:1px solid rgba(76,175,110,.25); }

  /* main */
  .main { margin-left:236px; padding-top:54px; min-height:100vh; transition:margin .25s; }
  .main.full { margin-left:0; }
  .page { padding:28px 26px; max-width:1080px; }

  /* section header */
  .sec-h { display:flex; align-items:center; justify-content:space-between; margin-bottom:24px; flex-wrap:wrap; gap:10px; }
  .sec-title { font-family:var(--font-d); font-size:30px; letter-spacing:1px; }
  .sec-title .hl-tr { color:var(--tr); }
  .sec-title .hl-pj { color:var(--pj); }

  /* stat grid */
  .stats-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(190px,1fr)); gap:14px; margin-bottom:24px; }
  .stat-card { background:var(--card); border:1px solid var(--border); border-radius:10px; padding:18px; position:relative; overflow:hidden; }
  .stat-card::before { content:''; position:absolute; top:0; left:0; right:0; height:3px; }
  .stat-tr::before { background:var(--tr); } .stat-pj::before { background:var(--pj); }
  .stat-blue::before { background:var(--info); } .stat-red::before { background:var(--danger); }
  .stat-green::before { background:var(--success); }
  .stat-label { font-size:10px; color:var(--muted); text-transform:uppercase; letter-spacing:1px; font-family:var(--font-m); margin-bottom:7px; }
  .stat-val { font-family:var(--font-d); font-size:28px; letter-spacing:1px; }
  .stat-icon { position:absolute; right:14px; top:14px; font-size:26px; opacity:.1; }

  /* card */
  .card { background:var(--card); border:1px solid var(--border); border-radius:10px; }
  .card-head { padding:16px 20px; border-bottom:1px solid var(--border); display:flex; align-items:center; justify-content:space-between; }
  .card-title { font-family:var(--font-d); font-size:17px; letter-spacing:.5px; }

  /* table */
  .tw { overflow-x:auto; }
  table { width:100%; border-collapse:collapse; font-size:13px; }
  thead th { padding:9px 14px; text-align:left; font-family:var(--font-m); font-size:10px; color:var(--muted); text-transform:uppercase; letter-spacing:1px; border-bottom:1px solid var(--border); }
  tbody td { padding:11px 14px; border-bottom:1px solid rgba(37,42,56,.7); }
  tbody tr:hover { background:rgba(255,255,255,.015); }
  tbody tr:last-child td { border-bottom:none; }

  /* badge */
  .badge { display:inline-block; padding:2px 9px; border-radius:20px; font-size:11px; font-family:var(--font-m); }
  .bg-green  { background:rgba(76,175,110,.15); color:#6ddb92; }
  .bg-orange { background:rgba(245,166,35,.15);  color:var(--tr); }
  .bg-blue   { background:rgba(74,144,217,.15);  color:#7ab8f5; }
  .bg-red    { background:rgba(224,82,82,.15);   color:#f08080; }
  .bg-gray   { background:rgba(90,99,128,.15);   color:var(--muted); }
  .bg-teal   { background:rgba(56,178,172,.15);  color:#5ee7e1; }

  /* buttons */
  .btn { display:inline-flex; align-items:center; gap:6px; padding:8px 16px; border-radius:7px; border:none; cursor:pointer; font-family:var(--font-b); font-weight:600; font-size:13px; transition:all .15s; }
  .btn-tr  { background:var(--tr); color:#000; } .btn-tr:hover { background:#d9901a; }
  .btn-pj  { background:var(--pj); color:#000; } .btn-pj:hover { background:#3a9458; }
  .btn-sec { background:var(--border); color:var(--text); } .btn-sec:hover { background:#303548; }
  .btn-del { background:rgba(224,82,82,.12); color:var(--danger); border:1px solid rgba(224,82,82,.25); } .btn-del:hover { background:rgba(224,82,82,.22); }
  .btn-ghost-pj { background:transparent; color:var(--pj); border:1px solid rgba(76,175,110,.35); } .btn-ghost-pj:hover { background:var(--pj-dim); }
  .btn-sm { padding:5px 11px; font-size:12px; }
  .btn-ico { padding:5px 8px; }

  /* forms */
  .fg   { display:flex; flex-direction:column; gap:6px; }
  .fgrid { display:grid; gap:14px; }
  .fgrid2 { grid-template-columns:1fr 1fr; }
  .flabel { font-size:10px; color:var(--muted); font-family:var(--font-m); text-transform:uppercase; letter-spacing:1px; }
  .finput, .fselect, .ftarea {
    background:var(--bg); border:1px solid var(--border); border-radius:7px;
    padding:9px 13px; color:var(--text); font-family:var(--font-b); font-size:14px;
    transition:border-color .15s; outline:none; width:100%;
  }
  .finput:focus, .fselect:focus, .ftarea:focus { border-color:var(--tr); }
  .finput.pj:focus, .fselect.pj:focus, .ftarea.pj:focus { border-color:var(--pj); }
  .ftarea { resize:vertical; min-height:76px; }
  .fselect option { background:var(--surface); }
  .rgroup { display:flex; gap:7px; flex-wrap:wrap; }
  .rbtn { padding:7px 14px; border-radius:7px; border:1px solid var(--border); cursor:pointer; font-size:13px; font-weight:500; transition:all .15s; background:var(--bg); color:var(--muted); }
  .rbtn.sel-tr { border-color:var(--tr); color:var(--tr); background:var(--tr-dim); }
  .rbtn.sel-pj { border-color:var(--pj); color:var(--pj); background:var(--pj-dim); }

  /* modal */
  .overlay { position:fixed; inset:0; background:rgba(0,0,0,.7); backdrop-filter:blur(3px); display:flex; align-items:center; justify-content:center; z-index:200; padding:14px; }
  .modal { background:var(--surface); border:1px solid var(--border); border-radius:12px; width:100%; max-width:560px; max-height:92vh; overflow-y:auto; }
  .modal.wide { max-width:720px; }
  .mhead { padding:18px 22px; border-bottom:1px solid var(--border); display:flex; align-items:center; justify-content:space-between; }
  .mtitle { font-family:var(--font-d); font-size:22px; letter-spacing:.5px; }
  .mclose { background:none; border:none; color:var(--muted); font-size:18px; cursor:pointer; }
  .mbody  { padding:22px; }
  .mfoot  { padding:14px 22px; border-top:1px solid var(--border); display:flex; justify-content:flex-end; gap:9px; }

  /* login */
  .login-wrap {
    min-height:100vh; display:flex; align-items:center; justify-content:center;
    background:var(--bg);
    background-image:
      repeating-linear-gradient(0deg,transparent,transparent 38px,rgba(37,42,56,.4) 38px,rgba(37,42,56,.4) 39px),
      repeating-linear-gradient(90deg,transparent,transparent 38px,rgba(37,42,56,.4) 38px,rgba(37,42,56,.4) 39px);
  }
  .login-card { background:var(--surface); border:1px solid var(--border); border-radius:14px; padding:40px; width:100%; max-width:370px; }
  .login-logo { text-align:center; margin-bottom:32px; }
  .login-big  { font-family:var(--font-d); font-size:38px; letter-spacing:2px; line-height:1; }
  .login-big .tr { color:var(--tr); } .login-big .pj { color:var(--pj); }
  .login-sub  { font-family:var(--font-m); font-size:9px; color:var(--muted); letter-spacing:3px; margin-top:6px; }
  .login-divider { display:flex; align-items:center; gap:10px; margin:14px 0; }
  .login-divider::before, .login-divider::after { content:''; flex:1; height:1px; background:var(--border); }
  .login-divider span { font-size:11px; color:var(--muted); }
  .login-err { background:rgba(224,82,82,.1); border:1px solid rgba(224,82,82,.3); color:var(--danger); padding:9px 13px; border-radius:7px; font-size:13px; margin-bottom:14px; }

  /* line items cotización */
  .li-row { display:grid; grid-template-columns:2fr 80px 120px 34px; gap:8px; align-items:center; margin-bottom:8px; }

  /* misc */
  .sep  { height:1px; background:var(--border); margin:18px 0; }
  .empty { text-align:center; padding:52px 24px; color:var(--muted); }
  .empty-icon { font-size:38px; margin-bottom:10px; }
  .money { font-family:var(--font-m); }
  .pos { color:var(--success); } .neg { color:var(--danger); }
  .pdf-chip { display:inline-flex; align-items:center; gap:5px; padding:3px 10px; background:rgba(224,82,82,.1); border:1px solid rgba(224,82,82,.2); border-radius:5px; font-size:11px; color:#f08080; cursor:pointer; }

  /* dashboard split */
  .dash-split { display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-bottom:24px; }
  .dash-area { background:var(--card); border:1px solid var(--border); border-radius:10px; overflow:hidden; }
  .dash-area-head { padding:12px 18px; display:flex; align-items:center; gap:8px; border-bottom:1px solid var(--border); }
  .dash-area-head span { font-family:var(--font-d); font-size:16px; letter-spacing:.5px; }

  @media(max-width:700px){
    .sidebar{transform:translateX(-236px);} .sidebar.open{transform:translateX(0);}
    .main{margin-left:0;} .topbar{left:0;}
    .fgrid2{grid-template-columns:1fr;} .stats-grid{grid-template-columns:1fr 1fr;}
    .dash-split{grid-template-columns:1fr;}
  }
`;

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const SK = {
  auth:"sc_auth",
  tr_rutas:"sc_tr_rutas", tr_facturas:"sc_tr_facturas",
  tr_cxp:"sc_tr_cxp",     tr_movs:"sc_tr_movs",
  tr_pagos:"sc_tr_pagos",
  pj_clientes:"sc_pj_cli", pj_cots:"sc_pj_cots",
  pj_proyectos:"sc_pj_proy", pj_facturas:"sc_pj_fact",
  pj_gastos:"sc_pj_gas",   pj_movs:"sc_pj_movs",
  pj_pagos:"sc_pj_pagos",
};
const ld  = k => { try { return JSON.parse(localStorage.getItem(k))||[]; } catch { return []; } };
const sv  = (k,v) => localStorage.setItem(k,JSON.stringify(v));
const uid = () => Math.random().toString(36).slice(2,9).toUpperCase();
const fCLP  = n => `$${Number(n||0).toLocaleString("es-CL")}`;
const fDate = d => d ? new Date(d).toLocaleDateString("es-CL") : "—";
const today = () => new Date().toISOString().slice(0,10);
const USERS = [{ user:"admin", pass:"charly2024", name:"Empresa Charly" }];

// ─── SMALL COMPONENTS ────────────────────────────────────────────────────────
const Badge = ({ s }) => {
  const m = { "En Proceso":"bg-blue","Terminado":"bg-teal","Pagado":"bg-green",
    "Pendiente":"bg-orange","Aprobada":"bg-green","Rechazada":"bg-red",
    "Pagada":"bg-green","Anulada":"bg-gray","Ingreso":"bg-green","Egreso":"bg-red" };
  return <span className={`badge ${m[s]||"bg-gray"}`}>{s}</span>;
};

const Modal = ({ title, onClose, children, footer, wide }) => (
  <div className="overlay" onClick={e=>e.target===e.currentTarget&&onClose()}>
    <div className={`modal${wide?" wide":""}`}>
      <div className="mhead"><span className="mtitle">{title}</span><button className="mclose" onClick={onClose}>✕</button></div>
      <div className="mbody">{children}</div>
      {footer && <div className="mfoot">{footer}</div>}
    </div>
  </div>
);

const Confirm = ({ msg, onOk, onClose }) => (
  <Modal title="Confirmar" onClose={onClose}
    footer={<><button className="btn btn-sec" onClick={onClose}>Cancelar</button><button className="btn btn-del" onClick={onOk}>Eliminar</button></>}>
    <p style={{fontSize:14,color:"var(--muted)"}}>{msg}</p>
  </Modal>
);

// ─── LOGIN ────────────────────────────────────────────────────────────────────
const Login = ({ onLogin }) => {
  const [u,setU]=useState(""); const [p,setP]=useState(""); const [err,setErr]=useState("");
  const go = () => {
    const f = USERS.find(x=>x.user===u&&x.pass===p);
    if (f) { sv(SK.auth,f); onLogin(f); } else setErr("Usuario o contraseña incorrectos");
  };
  return (
    <div className="login-wrap">
      <div className="login-card">
        <div className="login-logo">
          <div className="login-big"><span className="tr">TRANS</span> · <span className="pj">VERDE</span></div>
          <div className="login-sub">SISTEMA DE GESTIÓN CHARLY</div>
        </div>
        {err && <div className="login-err">{err}</div>}
        <div className="fg" style={{marginBottom:12}}>
          <label className="flabel">Usuario</label>
          <input className="finput" value={u} onChange={e=>setU(e.target.value)} placeholder="admin" onKeyDown={e=>e.key==="Enter"&&go()} />
        </div>
        <div className="fg" style={{marginBottom:22}}>
          <label className="flabel">Contraseña</label>
          <input className="finput" type="password" value={p} onChange={e=>setP(e.target.value)} placeholder="••••••••" onKeyDown={e=>e.key==="Enter"&&go()} />
        </div>
        <button className="btn btn-tr" style={{width:"100%",justifyContent:"center"}} onClick={go}>Ingresar →</button>
      </div>
    </div>
  );
};

// ─── CRUD HOOK ────────────────────────────────────────────────────────────────
const useCrud = (key) => {
  const [data,setData] = useState(()=>ld(key));
  const persist = d => { setData(d); sv(key,d); };
  const upsert  = row => { const ex=data.find(x=>x.id===row.id); persist(ex?data.map(x=>x.id===row.id?row:x):[...data,row]); };
  const remove  = id  => persist(data.filter(x=>x.id!==id));
  return { data, upsert, remove };
};

// ─── GENERIC TABLE PAGE ───────────────────────────────────────────────────────
// reusable table + modal pattern
const useModal = () => { const [m,setM]=useState(null); return { m, open:setM, close:()=>setM(null) }; };

// ════════════════════════════════════════════════════════════
//  TRANSPORTES
// ════════════════════════════════════════════════════════════

// ── Dashboard Transportes ─────────────────────────────────
const TrDashboard = () => {
  const rutas = ld(SK.tr_rutas); const movs=ld(SK.tr_movs); const cxp=ld(SK.tr_cxp);
  const now=new Date(); const mes=now.getMonth(); const anio=now.getFullYear();
  const esMes=d=>{if(!d)return false;const f=new Date(d);return f.getMonth()===mes&&f.getFullYear()===anio;};
  const viajes=rutas.filter(r=>esMes(r.fecha)).length;
  const facturado=rutas.filter(r=>esMes(r.fecha)).reduce((a,r)=>a+Number(r.monto||0),0);
  const pagado=movs.filter(m=>m.tipo==="Ingreso"&&esMes(m.fecha)).reduce((a,m)=>a+Number(m.monto||0),0);
  const porPagar=cxp.reduce((a,c)=>a+Number(c.monto||0),0);
  const recientes=[...rutas].sort((a,b)=>new Date(b.fecha)-new Date(a.fecha)).slice(0,5);
  return (
    <div>
      <div className="stats-grid">
        <div className="stat-card stat-tr"><div className="stat-icon">🚛</div><div className="stat-label">Viajes este mes</div><div className="stat-val">{viajes}</div></div>
        <div className="stat-card stat-blue"><div className="stat-icon">📋</div><div className="stat-label">Facturado mes</div><div className="stat-val money" style={{fontSize:20}}>{fCLP(facturado)}</div></div>
        <div className="stat-card stat-green"><div className="stat-icon">✅</div><div className="stat-label">Pagado mes</div><div className="stat-val money" style={{fontSize:20}}>{fCLP(pagado)}</div></div>
        <div className="stat-card stat-red"><div className="stat-icon">💸</div><div className="stat-label">Por pagar</div><div className="stat-val money" style={{fontSize:20}}>{fCLP(porPagar)}</div></div>
      </div>
      <div className="card">
        <div className="card-head"><span className="card-title">ÚLTIMAS RUTAS</span></div>
        {recientes.length===0?<div className="empty"><div className="empty-icon">🚛</div><p>Sin rutas aún</p></div>:(
          <div className="tw"><table>
            <thead><tr><th>Destino</th><th>Fecha</th><th>Camión</th><th>Monto</th><th>Estado</th></tr></thead>
            <tbody>{recientes.map(r=><tr key={r.id}>
              <td><strong>{r.destino}</strong></td>
              <td style={{fontFamily:"var(--font-m)",fontSize:12,color:"var(--muted)"}}>{fDate(r.fecha)}</td>
              <td>{r.camion||"—"}</td>
              <td className="money">{fCLP(r.monto)}</td>
              <td><Badge s={r.estado}/></td>
            </tr>)}</tbody>
          </table></div>
        )}
      </div>
    </div>
  );
};

// ── Rutas ─────────────────────────────────────────────────
const TrRutas = () => {
  const {data,upsert,remove} = useCrud(SK.tr_rutas);
  const {m,open,close} = useModal(); const [del,setDel]=useState(null);
  const blank = ()=>({id:uid(),destino:"",fecha:today(),estado:"En Proceso",camion:"",kmExtra:0,monto:0,mesActual:"S"});
  const [f,setF]=useState(blank()); const sf=(k,v)=>setF(p=>({...p,[k]:v}));
  return (
    <div>
      <div className="sec-h">
        <h1 className="sec-title">RU<span className="hl-tr">TAS</span></h1>
        <button className="btn btn-tr" onClick={()=>{setF(blank());open("new");}}>+ Nueva Ruta</button>
      </div>
      <div className="card">
        {data.length===0?<div className="empty"><div className="empty-icon">🚛</div><p>Sin rutas</p></div>:(
          <div className="tw"><table>
            <thead><tr><th>ID</th><th>Destino</th><th>Fecha</th><th>Camión</th><th>Km Extra</th><th>Monto</th><th>Estado</th><th>Mes</th><th></th></tr></thead>
            <tbody>{[...data].sort((a,b)=>new Date(b.fecha)-new Date(a.fecha)).map(r=><tr key={r.id}>
              <td style={{fontFamily:"var(--font-m)",fontSize:11,color:"var(--muted)"}}>{r.id}</td>
              <td><strong>{r.destino}</strong></td>
              <td style={{fontFamily:"var(--font-m)",fontSize:12,color:"var(--muted)"}}>{fDate(r.fecha)}</td>
              <td>{r.camion||"—"}</td>
              <td className="money">{r.kmExtra||0} km</td>
              <td className="money">{fCLP(r.monto)}</td>
              <td><Badge s={r.estado}/></td>
              <td><span className={`badge ${r.mesActual==="S"?"bg-green":"bg-gray"}`}>{r.mesActual}</span></td>
              <td><div style={{display:"flex",gap:5}}>
                <button className="btn btn-sm btn-sec btn-ico" onClick={()=>{setF(r);open("edit");}}>✏️</button>
                <button className="btn btn-sm btn-del btn-ico" onClick={()=>setDel(r.id)}>🗑️</button>
              </div></td>
            </tr>)}</tbody>
          </table></div>
        )}
      </div>
      {m&&<Modal title={m==="new"?"Nueva Ruta":"Editar Ruta"} onClose={close}
        footer={<><button className="btn btn-sec" onClick={close}>Cancelar</button><button className="btn btn-tr" onClick={()=>{upsert(f);close();}}>Guardar</button></>}>
        <div className="fgrid fgrid2">
          <div className="fg"><label className="flabel">ID</label><input className="finput" value={f.id} disabled style={{opacity:.4}}/></div>
          <div className="fg"><label className="flabel">Destino *</label><input className="finput" value={f.destino} onChange={e=>sf("destino",e.target.value)} placeholder="Ej: Temuco"/></div>
          <div className="fg"><label className="flabel">Fecha</label><input className="finput" type="date" value={f.fecha} onChange={e=>sf("fecha",e.target.value)}/></div>
          <div className="fg"><label className="flabel">Camión</label><input className="finput" value={f.camion} onChange={e=>sf("camion",e.target.value)} placeholder="Patente"/></div>
          <div className="fg"><label className="flabel">Km Adicionales</label><input className="finput" type="number" value={f.kmExtra} onChange={e=>sf("kmExtra",e.target.value)}/></div>
          <div className="fg"><label className="flabel">Monto ($)</label><input className="finput" type="number" value={f.monto} onChange={e=>sf("monto",e.target.value)}/></div>
          <div className="fg" style={{gridColumn:"1/-1"}}><label className="flabel">Estado</label>
            <div className="rgroup">{["En Proceso","Terminado","Pagado"].map(s=><div key={s} className={`rbtn ${f.estado===s?"sel-tr":""}`} onClick={()=>sf("estado",s)}>{s}</div>)}</div>
          </div>
          <div className="fg" style={{gridColumn:"1/-1"}}><label className="flabel">Mes Actual</label>
            <div className="rgroup">{["S","N"].map(s=><div key={s} className={`rbtn ${f.mesActual===s?"sel-tr":""}`} onClick={()=>sf("mesActual",s)}>{s}</div>)}</div>
          </div>
        </div>
      </Modal>}
      {del&&<Confirm msg="¿Eliminar esta ruta?" onOk={()=>{remove(del);setDel(null);}} onClose={()=>setDel(null)}/>}
    </div>
  );
};

// ── Facturas Transportes ──────────────────────────────────
const TrFacturas = () => {
  const {data,upsert,remove}=useCrud(SK.tr_facturas);
  const {m,open,close}=useModal(); const [del,setDel]=useState(null);
  const blank=()=>({id:uid(),numero:"",cliente:"",fecha:today(),monto:0,estado:"Pendiente",pdfName:"",pdfData:""});
  const [f,setF]=useState(blank()); const sf=(k,v)=>setF(p=>({...p,[k]:v}));
  const handlePDF=e=>{const file=e.target.files[0];if(!file)return;const r=new FileReader();r.onload=ev=>setF(p=>({...p,pdfName:file.name,pdfData:ev.target.result}));r.readAsDataURL(file);};
  const openPDF=fac=>{if(!fac.pdfData)return;const w=window.open();w.document.write(`<iframe src="${fac.pdfData}" style="width:100%;height:100vh;border:none;"></iframe>`);};
  return (
    <div>
      <div className="sec-h"><h1 className="sec-title">FAC<span className="hl-tr">TURAS</span></h1><button className="btn btn-tr" onClick={()=>{setF(blank());open("new");}}>+ Nueva</button></div>
      <div className="card">
        {data.length===0?<div className="empty"><div className="empty-icon">🧾</div><p>Sin facturas</p></div>:(
          <div className="tw"><table>
            <thead><tr><th>N°</th><th>Cliente</th><th>Fecha</th><th>Monto</th><th>Estado</th><th>PDF</th><th></th></tr></thead>
            <tbody>{[...data].sort((a,b)=>new Date(b.fecha)-new Date(a.fecha)).map(fac=><tr key={fac.id}>
              <td style={{fontFamily:"var(--font-m)"}}>{fac.numero}</td>
              <td><strong>{fac.cliente}</strong></td>
              <td style={{fontFamily:"var(--font-m)",fontSize:12,color:"var(--muted)"}}>{fDate(fac.fecha)}</td>
              <td className="money">{fCLP(fac.monto)}</td>
              <td><Badge s={fac.estado}/></td>
              <td>{fac.pdfData?<span className="pdf-chip" onClick={()=>openPDF(fac)}>📄 Ver</span>:<span style={{color:"var(--muted)",fontSize:12}}>—</span>}</td>
              <td><div style={{display:"flex",gap:5}}>
                <button className="btn btn-sm btn-sec btn-ico" onClick={()=>{setF(fac);open("edit");}}>✏️</button>
                <button className="btn btn-sm btn-del btn-ico" onClick={()=>setDel(fac.id)}>🗑️</button>
              </div></td>
            </tr>)}</tbody>
          </table></div>
        )}
      </div>
      {m&&<Modal title={m==="new"?"Nueva Factura":"Editar Factura"} onClose={close}
        footer={<><button className="btn btn-sec" onClick={close}>Cancelar</button><button className="btn btn-tr" onClick={()=>{upsert(f);close();}}>Guardar</button></>}>
        <div className="fgrid fgrid2">
          <div className="fg"><label className="flabel">N° Factura</label><input className="finput" value={f.numero} onChange={e=>sf("numero",e.target.value)} placeholder="001234"/></div>
          <div className="fg"><label className="flabel">Cliente</label><input className="finput" value={f.cliente} onChange={e=>sf("cliente",e.target.value)}/></div>
          <div className="fg"><label className="flabel">Fecha</label><input className="finput" type="date" value={f.fecha} onChange={e=>sf("fecha",e.target.value)}/></div>
          <div className="fg"><label className="flabel">Monto ($)</label><input className="finput" type="number" value={f.monto} onChange={e=>sf("monto",e.target.value)}/></div>
          <div className="fg" style={{gridColumn:"1/-1"}}><label className="flabel">Estado</label>
            <div className="rgroup">{["Pendiente","Pagada","Anulada"].map(s=><div key={s} className={`rbtn ${f.estado===s?"sel-tr":""}`} onClick={()=>sf("estado",s)}>{s}</div>)}</div>
          </div>
          <div className="fg" style={{gridColumn:"1/-1"}}><label className="flabel">PDF</label>
            <input type="file" accept="application/pdf" onChange={handlePDF} style={{color:"var(--text)",fontSize:13}}/>
            {f.pdfName&&<div style={{marginTop:6}}><span className="pdf-chip">📄 {f.pdfName}</span></div>}
          </div>
        </div>
      </Modal>}
      {del&&<Confirm msg="¿Eliminar esta factura?" onOk={()=>{remove(del);setDel(null);}} onClose={()=>setDel(null)}/>}
    </div>
  );
};

// ── CxP Transportes ───────────────────────────────────────
const TrCxP = () => {
  const {data,upsert,remove}=useCrud(SK.tr_cxp);
  const {m,open,close}=useModal(); const [del,setDel]=useState(null);
  const blank=()=>({id:uid(),tipo:"",fecha:today(),monto:0,descripcion:""});
  const [f,setF]=useState(blank()); const sf=(k,v)=>setF(p=>({...p,[k]:v}));
  const total=data.reduce((a,c)=>a+Number(c.monto||0),0);
  return (
    <div>
      <div className="sec-h"><h1 className="sec-title">CUENTAS POR <span className="hl-tr">PAGAR</span></h1><button className="btn btn-tr" onClick={()=>{setF(blank());open("new");}}>+ Agregar</button></div>
      <div className="stat-card stat-red" style={{maxWidth:240,marginBottom:18}}><div className="stat-label">Total por pagar</div><div className="stat-val money" style={{fontSize:22}}>{fCLP(total)}</div></div>
      <div className="card">
        {data.length===0?<div className="empty"><div className="empty-icon">💳</div><p>Sin cuentas</p></div>:(
          <div className="tw"><table>
            <thead><tr><th>Tipo</th><th>Fecha</th><th>Monto</th><th>Nota</th><th></th></tr></thead>
            <tbody>{[...data].sort((a,b)=>new Date(a.fecha)-new Date(b.fecha)).map(c=><tr key={c.id}>
              <td><strong>{c.tipo}</strong></td>
              <td style={{fontFamily:"var(--font-m)",fontSize:12,color:"var(--muted)"}}>{fDate(c.fecha)}</td>
              <td className="money neg">{fCLP(c.monto)}</td>
              <td style={{color:"var(--muted)",fontSize:12}}>{c.descripcion||"—"}</td>
              <td><div style={{display:"flex",gap:5}}>
                <button className="btn btn-sm btn-sec btn-ico" onClick={()=>{setF(c);open("edit");}}>✏️</button>
                <button className="btn btn-sm btn-del btn-ico" onClick={()=>setDel(c.id)}>🗑️</button>
              </div></td>
            </tr>)}</tbody>
          </table></div>
        )}
      </div>
      {m&&<Modal title={m==="new"?"Nueva Cuenta":"Editar"} onClose={close}
        footer={<><button className="btn btn-sec" onClick={close}>Cancelar</button><button className="btn btn-tr" onClick={()=>{upsert(f);close();}}>Guardar</button></>}>
        <div className="fgrid fgrid2">
          <div className="fg"><label className="flabel">Tipo *</label><input className="finput" value={f.tipo} onChange={e=>sf("tipo",e.target.value)} placeholder="Ej: Cuota camión"/></div>
          <div className="fg"><label className="flabel">Fecha</label><input className="finput" type="date" value={f.fecha} onChange={e=>sf("fecha",e.target.value)}/></div>
          <div className="fg"><label className="flabel">Monto ($)</label><input className="finput" type="number" value={f.monto} onChange={e=>sf("monto",e.target.value)}/></div>
          <div className="fg"><label className="flabel">Nota</label><textarea className="ftarea" value={f.descripcion} onChange={e=>sf("descripcion",e.target.value)}/></div>
        </div>
      </Modal>}
      {del&&<Confirm msg="¿Eliminar esta cuenta?" onOk={()=>{remove(del);setDel(null);}} onClose={()=>setDel(null)}/>}
    </div>
  );
};

// ── Movimientos Transportes ───────────────────────────────
const TrMovimientos = () => {
  const {data,upsert,remove}=useCrud(SK.tr_movs);
  const {m,open,close}=useModal(); const [del,setDel]=useState(null);
  const blank=(t="Ingreso")=>({id:uid(),tipo:t,descripcion:"",monto:0,fecha:today(),categoria:""});
  const [f,setF]=useState(blank()); const sf=(k,v)=>setF(p=>({...p,[k]:v}));
  const ing=data.filter(m=>m.tipo==="Ingreso").reduce((a,m)=>a+Number(m.monto||0),0);
  const egr=data.filter(m=>m.tipo==="Egreso").reduce((a,m)=>a+Number(m.monto||0),0);
  return (
    <div>
      <div className="sec-h"><h1 className="sec-title">MOVI<span className="hl-tr">MIENTOS</span></h1>
        <div style={{display:"flex",gap:8}}>
          <button className="btn btn-sec" onClick={()=>{setF(blank("Egreso"));open("new");}}>+ Egreso</button>
          <button className="btn btn-tr"  onClick={()=>{setF(blank("Ingreso"));open("new");}}>+ Ingreso</button>
        </div>
      </div>
      <div className="stats-grid" style={{gridTemplateColumns:"repeat(3,1fr)",maxWidth:520,marginBottom:18}}>
        <div className="stat-card stat-green"><div className="stat-label">Ingresos</div><div className="stat-val money" style={{fontSize:18}}>{fCLP(ing)}</div></div>
        <div className="stat-card stat-red">  <div className="stat-label">Egresos</div> <div className="stat-val money" style={{fontSize:18}}>{fCLP(egr)}</div></div>
        <div className="stat-card stat-blue"> <div className="stat-label">Saldo</div>   <div className="stat-val money" style={{fontSize:18,color:ing-egr>=0?"var(--success)":"var(--danger)"}}>{fCLP(ing-egr)}</div></div>
      </div>
      <div className="card">
        {data.length===0?<div className="empty"><div className="empty-icon">💰</div><p>Sin movimientos</p></div>:(
          <div className="tw"><table>
            <thead><tr><th>Tipo</th><th>Descripción</th><th>Categoría</th><th>Fecha</th><th>Monto</th><th></th></tr></thead>
            <tbody>{[...data].sort((a,b)=>new Date(b.fecha)-new Date(a.fecha)).map(mv=><tr key={mv.id}>
              <td><Badge s={mv.tipo}/></td>
              <td><strong>{mv.descripcion}</strong></td>
              <td style={{color:"var(--muted)",fontSize:12}}>{mv.categoria||"—"}</td>
              <td style={{fontFamily:"var(--font-m)",fontSize:12,color:"var(--muted)"}}>{fDate(mv.fecha)}</td>
              <td className={`money ${mv.tipo==="Ingreso"?"pos":"neg"}`}>{mv.tipo==="Egreso"?"-":""}{fCLP(mv.monto)}</td>
              <td><div style={{display:"flex",gap:5}}>
                <button className="btn btn-sm btn-sec btn-ico" onClick={()=>{setF(mv);open("edit");}}>✏️</button>
                <button className="btn btn-sm btn-del btn-ico" onClick={()=>setDel(mv.id)}>🗑️</button>
              </div></td>
            </tr>)}</tbody>
          </table></div>
        )}
      </div>
      {m&&<Modal title={m==="new"?"Nuevo Movimiento":"Editar"} onClose={close}
        footer={<><button className="btn btn-sec" onClick={close}>Cancelar</button><button className="btn btn-tr" onClick={()=>{upsert(f);close();}}>Guardar</button></>}>
        <div className="fgrid fgrid2">
          <div className="fg" style={{gridColumn:"1/-1"}}><label className="flabel">Tipo</label>
            <div className="rgroup">{["Ingreso","Egreso"].map(t=><div key={t} className={`rbtn ${f.tipo===t?"sel-tr":""}`} onClick={()=>sf("tipo",t)}>{t}</div>)}</div>
          </div>
          <div className="fg" style={{gridColumn:"1/-1"}}><label className="flabel">Descripción</label><input className="finput" value={f.descripcion} onChange={e=>sf("descripcion",e.target.value)}/></div>
          <div className="fg"><label className="flabel">Categoría</label><input className="finput" value={f.categoria} onChange={e=>sf("categoria",e.target.value)} placeholder="Ej: Flete"/></div>
          <div className="fg"><label className="flabel">Fecha</label><input className="finput" type="date" value={f.fecha} onChange={e=>sf("fecha",e.target.value)}/></div>
          <div className="fg"><label className="flabel">Monto ($)</label><input className="finput" type="number" value={f.monto} onChange={e=>sf("monto",e.target.value)}/></div>
        </div>
      </Modal>}
      {del&&<Confirm msg="¿Eliminar este movimiento?" onOk={()=>{remove(del);setDel(null);}} onClose={()=>setDel(null)}/>}
    </div>
  );
};

// ── Historial Pagos Transportes ───────────────────────────
const TrPagos = () => {
  const TIPOS=["Cuota camión","Contadora","Crédito Ripley","Seguro","Sueldo","Copec","Crédito banco estado","IVA","Imposiciones","Sueldos","TCT","Nano","Papa","Otro"];
  const {data,upsert,remove}=useCrud(SK.tr_pagos);
  const {m,open,close}=useModal(); const [del,setDel]=useState(null);
  const blank=()=>({id:uid(),tipo:"",fecha:today(),monto:0,nota:""});
  const [f,setF]=useState(blank()); const sf=(k,v)=>setF(p=>({...p,[k]:v}));
  const total=data.reduce((a,c)=>a+Number(c.monto||0),0);
  return (
    <div>
      <div className="sec-h"><h1 className="sec-title">HISTORIAL DE <span className="hl-tr">PAGOS</span></h1><button className="btn btn-tr" onClick={()=>{setF(blank());open("new");}}>+ Agregar</button></div>
      <div className="stat-card stat-tr" style={{maxWidth:240,marginBottom:18}}><div className="stat-label">Total pagado</div><div className="stat-val money" style={{fontSize:22}}>{fCLP(total)}</div></div>
      <div className="card">
        {data.length===0?<div className="empty"><div className="empty-icon">📋</div><p>Sin pagos</p></div>:(
          <div className="tw"><table>
            <thead><tr><th>Tipo</th><th>Fecha</th><th>Monto</th><th>Nota</th><th></th></tr></thead>
            <tbody>{[...data].sort((a,b)=>new Date(b.fecha)-new Date(a.fecha)).map(p=><tr key={p.id}>
              <td><strong>{p.tipo}</strong></td>
              <td style={{fontFamily:"var(--font-m)",fontSize:12,color:"var(--muted)"}}>{fDate(p.fecha)}</td>
              <td className="money neg">{fCLP(p.monto)}</td>
              <td style={{color:"var(--muted)",fontSize:12}}>{p.nota||"—"}</td>
              <td><div style={{display:"flex",gap:5}}>
                <button className="btn btn-sm btn-sec btn-ico" onClick={()=>{setF(p);open("edit");}}>✏️</button>
                <button className="btn btn-sm btn-del btn-ico" onClick={()=>setDel(p.id)}>🗑️</button>
              </div></td>
            </tr>)}</tbody>
          </table></div>
        )}
      </div>
      {m&&<Modal title={m==="new"?"Nuevo Pago":"Editar"} onClose={close}
        footer={<><button className="btn btn-sec" onClick={close}>Cancelar</button><button className="btn btn-tr" onClick={()=>{upsert(f);close();}}>Guardar</button></>}>
        <div className="fgrid fgrid2">
          <div className="fg"><label className="flabel">Tipo</label>
            <select className="fselect" value={f.tipo} onChange={e=>sf("tipo",e.target.value)}>
              <option value="">Seleccionar...</option>
              {TIPOS.map(t=><option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div className="fg"><label className="flabel">Fecha</label><input className="finput" type="date" value={f.fecha} onChange={e=>sf("fecha",e.target.value)}/></div>
          <div className="fg"><label className="flabel">Monto ($)</label><input className="finput" type="number" value={f.monto} onChange={e=>sf("monto",e.target.value)}/></div>
          <div className="fg"><label className="flabel">Nota</label><textarea className="ftarea" value={f.nota} onChange={e=>sf("nota",e.target.value)}/></div>
        </div>
      </Modal>}
      {del&&<Confirm msg="¿Eliminar este pago?" onOk={()=>{remove(del);setDel(null);}} onClose={()=>setDel(null)}/>}
    </div>
  );
};

// ════════════════════════════════════════════════════════════
//  PAISAJISMO
// ════════════════════════════════════════════════════════════

const PjDashboard = () => {
  const clientes=ld(SK.pj_clientes); const cots=ld(SK.pj_cots);
  const proyectos=ld(SK.pj_proyectos); const facturas=ld(SK.pj_facturas);
  const activos=proyectos.filter(p=>p.estado==="En Proceso").length;
  const cotPend=cots.filter(c=>c.estado==="Pendiente").length;
  const totalFact=facturas.reduce((a,f)=>a+Number(f.monto||0),0);
  const recProy=[...proyectos].sort((a,b)=>new Date(b.fecha)-new Date(a.fecha)).slice(0,5);
  return (
    <div>
      <div className="stats-grid">
        <div className="stat-card stat-pj"><div className="stat-icon">🏗️</div><div className="stat-label">Proyectos activos</div><div className="stat-val">{activos}</div></div>
        <div className="stat-card stat-blue"><div className="stat-icon">📋</div><div className="stat-label">Cotizaciones pend.</div><div className="stat-val">{cotPend}</div></div>
        <div className="stat-card stat-green"><div className="stat-icon">🧾</div><div className="stat-label">Total facturado</div><div className="stat-val money" style={{fontSize:20}}>{fCLP(totalFact)}</div></div>
        <div className="stat-card stat-pj"><div className="stat-icon">👥</div><div className="stat-label">Clientes</div><div className="stat-val">{clientes.length}</div></div>
      </div>
      <div className="card">
        <div className="card-head"><span className="card-title">PROYECTOS RECIENTES</span></div>
        {recProy.length===0?<div className="empty"><div className="empty-icon">🌿</div><p>Sin proyectos aún</p></div>:(
          <div className="tw"><table>
            <thead><tr><th>Proyecto</th><th>Cliente</th><th>Fecha</th><th>Monto</th><th>Estado</th></tr></thead>
            <tbody>{recProy.map(p=><tr key={p.id}>
              <td><strong>{p.nombre}</strong></td>
              <td style={{color:"var(--muted)"}}>{p.cliente}</td>
              <td style={{fontFamily:"var(--font-m)",fontSize:12,color:"var(--muted)"}}>{fDate(p.fecha)}</td>
              <td className="money">{fCLP(p.monto)}</td>
              <td><Badge s={p.estado}/></td>
            </tr>)}</tbody>
          </table></div>
        )}
      </div>
    </div>
  );
};

const PjClientes = () => {
  const {data,upsert,remove}=useCrud(SK.pj_clientes);
  const {m,open,close}=useModal(); const [del,setDel]=useState(null);
  const blank=()=>({id:uid(),nombre:"",rut:"",email:"",telefono:"",direccion:"",nota:""});
  const [f,setF]=useState(blank()); const sf=(k,v)=>setF(p=>({...p,[k]:v}));
  return (
    <div>
      <div className="sec-h"><h1 className="sec-title">CLIEN<span className="hl-pj">TES</span></h1><button className="btn btn-pj" onClick={()=>{setF(blank());open("new");}}>+ Nuevo</button></div>
      <div className="card">
        {data.length===0?<div className="empty"><div className="empty-icon">👥</div><p>Sin clientes</p></div>:(
          <div className="tw"><table>
            <thead><tr><th>Nombre</th><th>RUT</th><th>Email</th><th>Teléfono</th><th>Dirección</th><th></th></tr></thead>
            <tbody>{data.map(c=><tr key={c.id}>
              <td><strong>{c.nombre}</strong></td>
              <td style={{fontFamily:"var(--font-m)",fontSize:12}}>{c.rut||"—"}</td>
              <td style={{color:"var(--muted)",fontSize:12}}>{c.email||"—"}</td>
              <td style={{fontFamily:"var(--font-m)",fontSize:12}}>{c.telefono||"—"}</td>
              <td style={{color:"var(--muted)",fontSize:12}}>{c.direccion||"—"}</td>
              <td><div style={{display:"flex",gap:5}}>
                <button className="btn btn-sm btn-sec btn-ico" onClick={()=>{setF(c);open("edit");}}>✏️</button>
                <button className="btn btn-sm btn-del btn-ico" onClick={()=>setDel(c.id)}>🗑️</button>
              </div></td>
            </tr>)}</tbody>
          </table></div>
        )}
      </div>
      {m&&<Modal title={m==="new"?"Nuevo Cliente":"Editar Cliente"} onClose={close}
        footer={<><button className="btn btn-sec" onClick={close}>Cancelar</button><button className="btn btn-pj" onClick={()=>{upsert(f);close();}}>Guardar</button></>}>
        <div className="fgrid fgrid2">
          <div className="fg" style={{gridColumn:"1/-1"}}><label className="flabel">Nombre *</label><input className="finput pj" value={f.nombre} onChange={e=>sf("nombre",e.target.value)}/></div>
          <div className="fg"><label className="flabel">RUT</label><input className="finput pj" value={f.rut} onChange={e=>sf("rut",e.target.value)} placeholder="12.345.678-9"/></div>
          <div className="fg"><label className="flabel">Email</label><input className="finput pj" type="email" value={f.email} onChange={e=>sf("email",e.target.value)}/></div>
          <div className="fg"><label className="flabel">Teléfono</label><input className="finput pj" value={f.telefono} onChange={e=>sf("telefono",e.target.value)}/></div>
          <div className="fg"><label className="flabel">Dirección</label><input className="finput pj" value={f.direccion} onChange={e=>sf("direccion",e.target.value)}/></div>
          <div className="fg" style={{gridColumn:"1/-1"}}><label className="flabel">Notas</label><textarea className="ftarea pj" value={f.nota} onChange={e=>sf("nota",e.target.value)}/></div>
        </div>
      </Modal>}
      {del&&<Confirm msg="¿Eliminar este cliente?" onOk={()=>{remove(del);setDel(null);}} onClose={()=>setDel(null)}/>}
    </div>
  );
};

const PjCotizaciones = () => {
  const clientes=ld(SK.pj_clientes);
  const {data,upsert,remove}=useCrud(SK.pj_cots);
  const {m,open,close}=useModal(); const [preview,setPreview]=useState(null); const [del,setDel]=useState(null);
  const blank=()=>({id:uid(),numero:`COT-${Date.now().toString().slice(-5)}`,cliente:"",fecha:today(),validez:"",descripcion:"",estado:"Pendiente",items:[{desc:"",cantidad:1,precio:0}]});
  const [f,setF]=useState(blank()); const sf=(k,v)=>setF(p=>({...p,[k]:v}));
  const addItem=()=>setF(p=>({...p,items:[...p.items,{desc:"",cantidad:1,precio:0}]}));
  const setItem=(i,k,v)=>setF(p=>({...p,items:p.items.map((it,j)=>j===i?{...it,[k]:v}:it)}));
  const delItem=i=>setF(p=>({...p,items:p.items.filter((_,j)=>j!==i)}));
  const neto=f.items.reduce((a,it)=>a+Number(it.precio||0)*Number(it.cantidad||1),0);
  const totCot=c=>Math.round(c.items.reduce((a,it)=>a+Number(it.precio||0)*Number(it.cantidad||1),0)*1.19);
  return (
    <div>
      <div className="sec-h"><h1 className="sec-title">COTIZA<span className="hl-pj">CIONES</span></h1><button className="btn btn-pj" onClick={()=>{setF(blank());open("new");}}>+ Nueva</button></div>
      <div className="card">
        {data.length===0?<div className="empty"><div className="empty-icon">📋</div><p>Sin cotizaciones</p></div>:(
          <div className="tw"><table>
            <thead><tr><th>N°</th><th>Cliente</th><th>Fecha</th><th>Total c/IVA</th><th>Estado</th><th></th></tr></thead>
            <tbody>{[...data].sort((a,b)=>new Date(b.fecha)-new Date(a.fecha)).map(c=><tr key={c.id}>
              <td style={{fontFamily:"var(--font-m)",fontSize:12}}>{c.numero}</td>
              <td><strong>{c.cliente}</strong></td>
              <td style={{fontFamily:"var(--font-m)",fontSize:12,color:"var(--muted)"}}>{fDate(c.fecha)}</td>
              <td className="money">{fCLP(totCot(c))}</td>
              <td><Badge s={c.estado}/></td>
              <td><div style={{display:"flex",gap:5}}>
                <button className="btn btn-sm btn-ghost-pj btn-ico" onClick={()=>setPreview(c)} title="Ver">👁️</button>
                <button className="btn btn-sm btn-sec btn-ico" onClick={()=>{setF(c);open("edit");}}>✏️</button>
                <button className="btn btn-sm btn-del btn-ico" onClick={()=>setDel(c.id)}>🗑️</button>
              </div></td>
            </tr>)}</tbody>
          </table></div>
        )}
      </div>
      {m&&<Modal title={m==="new"?"Nueva Cotización":"Editar Cotización"} onClose={close} wide
        footer={<><button className="btn btn-sec" onClick={close}>Cancelar</button><button className="btn btn-pj" onClick={()=>{upsert(f);close();}}>Guardar</button></>}>
        <div className="fgrid fgrid2">
          <div className="fg"><label className="flabel">N° Cotización</label><input className="finput pj" value={f.numero} onChange={e=>sf("numero",e.target.value)}/></div>
          <div className="fg"><label className="flabel">Cliente *</label>
            <select className="fselect pj" value={f.cliente} onChange={e=>sf("cliente",e.target.value)}>
              <option value="">Seleccionar...</option>
              {clientes.map(c=><option key={c.id} value={c.nombre}>{c.nombre}</option>)}
            </select>
          </div>
          <div className="fg"><label className="flabel">Fecha</label><input className="finput pj" type="date" value={f.fecha} onChange={e=>sf("fecha",e.target.value)}/></div>
          <div className="fg"><label className="flabel">Válida hasta</label><input className="finput pj" type="date" value={f.validez} onChange={e=>sf("validez",e.target.value)}/></div>
          <div className="fg" style={{gridColumn:"1/-1"}}><label className="flabel">Estado</label>
            <div className="rgroup">{["Pendiente","Aprobada","Rechazada"].map(s=><div key={s} className={`rbtn ${f.estado===s?"sel-pj":""}`} onClick={()=>sf("estado",s)}>{s}</div>)}</div>
          </div>
          <div className="fg" style={{gridColumn:"1/-1"}}><label className="flabel">Descripción</label><textarea className="ftarea pj" value={f.descripcion} onChange={e=>sf("descripcion",e.target.value)} placeholder="Descripción del trabajo..."/></div>
        </div>
        <div className="sep"/>
        <div style={{fontFamily:"var(--font-m)",fontSize:10,color:"var(--muted)",textTransform:"uppercase",letterSpacing:1,marginBottom:10}}>Items</div>
        {f.items.map((it,i)=>(
          <div key={i} className="li-row">
            <input className="finput pj" placeholder="Descripción" value={it.desc} onChange={e=>setItem(i,"desc",e.target.value)}/>
            <input className="finput pj" type="number" placeholder="Cant." value={it.cantidad} onChange={e=>setItem(i,"cantidad",e.target.value)}/>
            <input className="finput pj" type="number" placeholder="Precio unit." value={it.precio} onChange={e=>setItem(i,"precio",e.target.value)}/>
            <button className="btn btn-sm btn-del btn-ico" onClick={()=>delItem(i)}>✕</button>
          </div>
        ))}
        <div style={{display:"flex",alignItems:"center",gap:12,paddingTop:10}}>
          <button className="btn btn-ghost-pj btn-sm" onClick={addItem}>+ Item</button>
          <span style={{marginLeft:"auto",fontFamily:"var(--font-m)",fontSize:12}}>
            Neto: {fCLP(neto)} · IVA: {fCLP(Math.round(neto*.19))} · <strong>Total: {fCLP(Math.round(neto*1.19))}</strong>
          </span>
        </div>
      </Modal>}
      {preview&&<Modal title={`Vista Previa — ${preview.numero}`} onClose={()=>setPreview(null)} wide
        footer={<><button className="btn btn-sec" onClick={()=>setPreview(null)}>Cerrar</button><button className="btn btn-pj" onClick={()=>window.print()}>🖨️ Imprimir / PDF</button></>}>
        <div style={{background:"#fff",borderRadius:8,padding:28,color:"#2d3d2f",fontFamily:"var(--font-b)"}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:24}}>
            <div><div style={{fontFamily:"var(--font-d)",fontSize:22,color:"#1c2b1e"}}>🌿 Paisajismo Charly</div>
              <div style={{fontFamily:"var(--font-m)",fontSize:11,color:"#7a9478",marginTop:4}}>{preview.numero} · {fDate(preview.fecha)}</div></div>
            <div style={{textAlign:"right",fontSize:13,color:"#7a9478"}}>
              <div><strong style={{color:"#2d3d2f"}}>Cliente:</strong> {preview.cliente}</div>
              {preview.validez&&<div><strong style={{color:"#2d3d2f"}}>Válida hasta:</strong> {fDate(preview.validez)}</div>}
            </div>
          </div>
          {preview.descripcion&&<p style={{fontSize:13,marginBottom:16,color:"#5a6370"}}>{preview.descripcion}</p>}
          <table style={{width:"100%",fontSize:13,borderCollapse:"collapse"}}>
            <thead><tr style={{background:"#f5f7f2"}}>
              {["Descripción","Cant.","Precio Unit.","Total"].map(h=><th key={h} style={{padding:"8px 10px",textAlign:h==="Descripción"?"left":"right",border:"1px solid #dde5d8",fontFamily:"monospace",fontSize:11,color:"#7a9478",textTransform:"uppercase"}}>{h}</th>)}
            </tr></thead>
            <tbody>{preview.items.map((it,i)=>{
              const sub=Number(it.precio||0)*Number(it.cantidad||1);
              return <tr key={i}>
                <td style={{padding:"7px 10px",border:"1px solid #dde5d8"}}>{it.desc}</td>
                <td style={{padding:"7px 10px",border:"1px solid #dde5d8",textAlign:"right"}}>{it.cantidad}</td>
                <td style={{padding:"7px 10px",border:"1px solid #dde5d8",textAlign:"right",fontFamily:"monospace"}}>{fCLP(it.precio)}</td>
                <td style={{padding:"7px 10px",border:"1px solid #dde5d8",textAlign:"right",fontFamily:"monospace"}}>{fCLP(sub)}</td>
              </tr>;
            })}</tbody>
          </table>
          {(()=>{const n=preview.items.reduce((a,it)=>a+Number(it.precio||0)*Number(it.cantidad||1),0);return(
            <div style={{display:"flex",justifyContent:"flex-end",gap:20,marginTop:14,fontSize:13}}>
              <div style={{color:"#7a9478"}}>Neto<br/><strong style={{color:"#2d3d2f",fontFamily:"monospace"}}>{fCLP(n)}</strong></div>
              <div style={{color:"#7a9478"}}>IVA 19%<br/><strong style={{color:"#2d3d2f",fontFamily:"monospace"}}>{fCLP(Math.round(n*.19))}</strong></div>
              <div style={{background:"#1c2b1e",color:"#fff",padding:"8px 18px",borderRadius:7}}>
                <div style={{fontSize:10,opacity:.5,fontFamily:"monospace"}}>TOTAL</div>
                <div style={{fontFamily:"var(--font-d)",fontSize:20}}>{fCLP(Math.round(n*1.19))}</div>
              </div>
            </div>
          );})()}
        </div>
      </Modal>}
      {del&&<Confirm msg="¿Eliminar esta cotización?" onOk={()=>{remove(del);setDel(null);}} onClose={()=>setDel(null)}/>}
    </div>
  );
};

const PjProyectos = () => {
  const clientes=ld(SK.pj_clientes); const cots=ld(SK.pj_cots);
  const {data,upsert,remove}=useCrud(SK.pj_proyectos);
  const {m,open,close}=useModal(); const [del,setDel]=useState(null);
  const blank=()=>({id:uid(),nombre:"",cliente:"",cotizacion:"",fecha:today(),fechaFin:"",monto:0,estado:"En Proceso",descripcion:""});
  const [f,setF]=useState(blank()); const sf=(k,v)=>setF(p=>({...p,[k]:v}));
  return (
    <div>
      <div className="sec-h"><h1 className="sec-title">PRO<span className="hl-pj">YECTOS</span></h1><button className="btn btn-pj" onClick={()=>{setF(blank());open("new");}}>+ Nuevo</button></div>
      <div className="card">
        {data.length===0?<div className="empty"><div className="empty-icon">🏗️</div><p>Sin proyectos</p></div>:(
          <div className="tw"><table>
            <thead><tr><th>Proyecto</th><th>Cliente</th><th>Inicio</th><th>Término</th><th>Monto</th><th>Estado</th><th></th></tr></thead>
            <tbody>{[...data].sort((a,b)=>new Date(b.fecha)-new Date(a.fecha)).map(p=><tr key={p.id}>
              <td><strong>{p.nombre}</strong></td>
              <td style={{color:"var(--muted)"}}>{p.cliente}</td>
              <td style={{fontFamily:"var(--font-m)",fontSize:12,color:"var(--muted)"}}>{fDate(p.fecha)}</td>
              <td style={{fontFamily:"var(--font-m)",fontSize:12,color:"var(--muted)"}}>{fDate(p.fechaFin)||"—"}</td>
              <td className="money">{fCLP(p.monto)}</td>
              <td><Badge s={p.estado}/></td>
              <td><div style={{display:"flex",gap:5}}>
                <button className="btn btn-sm btn-sec btn-ico" onClick={()=>{setF(p);open("edit");}}>✏️</button>
                <button className="btn btn-sm btn-del btn-ico" onClick={()=>setDel(p.id)}>🗑️</button>
              </div></td>
            </tr>)}</tbody>
          </table></div>
        )}
      </div>
      {m&&<Modal title={m==="new"?"Nuevo Proyecto":"Editar Proyecto"} onClose={close}
        footer={<><button className="btn btn-sec" onClick={close}>Cancelar</button><button className="btn btn-pj" onClick={()=>{upsert(f);close();}}>Guardar</button></>}>
        <div className="fgrid fgrid2">
          <div className="fg" style={{gridColumn:"1/-1"}}><label className="flabel">Nombre *</label><input className="finput pj" value={f.nombre} onChange={e=>sf("nombre",e.target.value)} placeholder="Ej: Jardín residencial"/></div>
          <div className="fg"><label className="flabel">Cliente *</label>
            <select className="fselect pj" value={f.cliente} onChange={e=>sf("cliente",e.target.value)}>
              <option value="">Seleccionar...</option>
              {clientes.map(c=><option key={c.id} value={c.nombre}>{c.nombre}</option>)}
            </select>
          </div>
          <div className="fg"><label className="flabel">Cotización asociada</label>
            <select className="fselect pj" value={f.cotizacion} onChange={e=>sf("cotizacion",e.target.value)}>
              <option value="">Sin cotización</option>
              {cots.filter(c=>c.estado==="Aprobada").map(c=><option key={c.id} value={c.numero}>{c.numero} — {c.cliente}</option>)}
            </select>
          </div>
          <div className="fg"><label className="flabel">Fecha inicio</label><input className="finput pj" type="date" value={f.fecha} onChange={e=>sf("fecha",e.target.value)}/></div>
          <div className="fg"><label className="flabel">Fecha término</label><input className="finput pj" type="date" value={f.fechaFin} onChange={e=>sf("fechaFin",e.target.value)}/></div>
          <div className="fg"><label className="flabel">Monto ($)</label><input className="finput pj" type="number" value={f.monto} onChange={e=>sf("monto",e.target.value)}/></div>
          <div className="fg" style={{gridColumn:"1/-1"}}><label className="flabel">Estado</label>
            <div className="rgroup">{["En Proceso","Terminado","Pagado"].map(s=><div key={s} className={`rbtn ${f.estado===s?"sel-pj":""}`} onClick={()=>sf("estado",s)}>{s}</div>)}</div>
          </div>
          <div className="fg" style={{gridColumn:"1/-1"}}><label className="flabel">Notas</label><textarea className="ftarea pj" value={f.descripcion} onChange={e=>sf("descripcion",e.target.value)}/></div>
        </div>
      </Modal>}
      {del&&<Confirm msg="¿Eliminar este proyecto?" onOk={()=>{remove(del);setDel(null);}} onClose={()=>setDel(null)}/>}
    </div>
  );
};

const PjFacturas = () => {
  const clientes=ld(SK.pj_clientes);
  const {data,upsert,remove}=useCrud(SK.pj_facturas);
  const {m,open,close}=useModal(); const [del,setDel]=useState(null);
  const blank=()=>({id:uid(),numero:"",cliente:"",fecha:today(),monto:0,estado:"Pendiente",pdfName:"",pdfData:""});
  const [f,setF]=useState(blank()); const sf=(k,v)=>setF(p=>({...p,[k]:v}));
  const handlePDF=e=>{const file=e.target.files[0];if(!file)return;const r=new FileReader();r.onload=ev=>setF(p=>({...p,pdfName:file.name,pdfData:ev.target.result}));r.readAsDataURL(file);};
  const openPDF=fac=>{if(!fac.pdfData)return;const w=window.open();w.document.write(`<iframe src="${fac.pdfData}" style="width:100%;height:100vh;border:none;"></iframe>`);};
  return (
    <div>
      <div className="sec-h"><h1 className="sec-title">FAC<span className="hl-pj">TURAS</span></h1><button className="btn btn-pj" onClick={()=>{setF(blank());open("new");}}>+ Nueva</button></div>
      <div className="card">
        {data.length===0?<div className="empty"><div className="empty-icon">🧾</div><p>Sin facturas</p></div>:(
          <div className="tw"><table>
            <thead><tr><th>N°</th><th>Cliente</th><th>Fecha</th><th>Monto</th><th>Estado</th><th>PDF</th><th></th></tr></thead>
            <tbody>{[...data].sort((a,b)=>new Date(b.fecha)-new Date(a.fecha)).map(fac=><tr key={fac.id}>
              <td style={{fontFamily:"var(--font-m)"}}>{fac.numero}</td>
              <td><strong>{fac.cliente}</strong></td>
              <td style={{fontFamily:"var(--font-m)",fontSize:12,color:"var(--muted)"}}>{fDate(fac.fecha)}</td>
              <td className="money">{fCLP(fac.monto)}</td>
              <td><Badge s={fac.estado}/></td>
              <td>{fac.pdfData?<span className="pdf-chip" onClick={()=>openPDF(fac)}>📄 Ver</span>:<span style={{color:"var(--muted)",fontSize:12}}>—</span>}</td>
              <td><div style={{display:"flex",gap:5}}>
                <button className="btn btn-sm btn-sec btn-ico" onClick={()=>{setF(fac);open("edit");}}>✏️</button>
                <button className="btn btn-sm btn-del btn-ico" onClick={()=>setDel(fac.id)}>🗑️</button>
              </div></td>
            </tr>)}</tbody>
          </table></div>
        )}
      </div>
      {m&&<Modal title={m==="new"?"Nueva Factura":"Editar"} onClose={close}
        footer={<><button className="btn btn-sec" onClick={close}>Cancelar</button><button className="btn btn-pj" onClick={()=>{upsert(f);close();}}>Guardar</button></>}>
        <div className="fgrid fgrid2">
          <div className="fg"><label className="flabel">N° Factura</label><input className="finput pj" value={f.numero} onChange={e=>sf("numero",e.target.value)}/></div>
          <div className="fg"><label className="flabel">Cliente *</label>
            <select className="fselect pj" value={f.cliente} onChange={e=>sf("cliente",e.target.value)}>
              <option value="">Seleccionar...</option>
              {clientes.map(c=><option key={c.id} value={c.nombre}>{c.nombre}</option>)}
            </select>
          </div>
          <div className="fg"><label className="flabel">Fecha</label><input className="finput pj" type="date" value={f.fecha} onChange={e=>sf("fecha",e.target.value)}/></div>
          <div className="fg"><label className="flabel">Monto ($)</label><input className="finput pj" type="number" value={f.monto} onChange={e=>sf("monto",e.target.value)}/></div>
          <div className="fg" style={{gridColumn:"1/-1"}}><label className="flabel">Estado</label>
            <div className="rgroup">{["Pendiente","Pagada","Anulada"].map(s=><div key={s} className={`rbtn ${f.estado===s?"sel-pj":""}`} onClick={()=>sf("estado",s)}>{s}</div>)}</div>
          </div>
          <div className="fg" style={{gridColumn:"1/-1"}}><label className="flabel">PDF</label>
            <input type="file" accept="application/pdf" onChange={handlePDF} style={{color:"var(--text)",fontSize:13}}/>
            {f.pdfName&&<div style={{marginTop:6}}><span className="pdf-chip">📄 {f.pdfName}</span></div>}
          </div>
        </div>
      </Modal>}
      {del&&<Confirm msg="¿Eliminar esta factura?" onOk={()=>{remove(del);setDel(null);}} onClose={()=>setDel(null)}/>}
    </div>
  );
};

const PjGastos = () => {
  const CATS=["Materiales","Plantas","Mano de obra / Jornal","Herramientas","Transporte","Combustible","Otro"];
  const {data,upsert,remove}=useCrud(SK.pj_gastos);
  const {m,open,close}=useModal(); const [del,setDel]=useState(null);
  const blank=()=>({id:uid(),descripcion:"",categoria:"Materiales",fecha:today(),monto:0,nota:""});
  const [f,setF]=useState(blank()); const sf=(k,v)=>setF(p=>({...p,[k]:v}));
  const total=data.reduce((a,g)=>a+Number(g.monto||0),0);
  return (
    <div>
      <div className="sec-h"><h1 className="sec-title">GAS<span className="hl-pj">TOS</span></h1><button className="btn btn-pj" onClick={()=>{setF(blank());open("new");}}>+ Agregar</button></div>
      <div className="stat-card stat-red" style={{maxWidth:240,marginBottom:18}}><div className="stat-label">Total gastos</div><div className="stat-val money" style={{fontSize:22,color:"var(--danger)"}}>{fCLP(total)}</div></div>
      <div className="card">
        {data.length===0?<div className="empty"><div className="empty-icon">🌱</div><p>Sin gastos</p></div>:(
          <div className="tw"><table>
            <thead><tr><th>Descripción</th><th>Categoría</th><th>Fecha</th><th>Monto</th><th>Nota</th><th></th></tr></thead>
            <tbody>{[...data].sort((a,b)=>new Date(b.fecha)-new Date(a.fecha)).map(g=><tr key={g.id}>
              <td><strong>{g.descripcion}</strong></td>
              <td><span className="badge bg-teal">{g.categoria}</span></td>
              <td style={{fontFamily:"var(--font-m)",fontSize:12,color:"var(--muted)"}}>{fDate(g.fecha)}</td>
              <td className="money neg">{fCLP(g.monto)}</td>
              <td style={{color:"var(--muted)",fontSize:12}}>{g.nota||"—"}</td>
              <td><div style={{display:"flex",gap:5}}>
                <button className="btn btn-sm btn-sec btn-ico" onClick={()=>{setF(g);open("edit");}}>✏️</button>
                <button className="btn btn-sm btn-del btn-ico" onClick={()=>setDel(g.id)}>🗑️</button>
              </div></td>
            </tr>)}</tbody>
          </table></div>
        )}
      </div>
      {m&&<Modal title={m==="new"?"Nuevo Gasto":"Editar"} onClose={close}
        footer={<><button className="btn btn-sec" onClick={close}>Cancelar</button><button className="btn btn-pj" onClick={()=>{upsert(f);close();}}>Guardar</button></>}>
        <div className="fgrid fgrid2">
          <div className="fg" style={{gridColumn:"1/-1"}}><label className="flabel">Descripción *</label><input className="finput pj" value={f.descripcion} onChange={e=>sf("descripcion",e.target.value)}/></div>
          <div className="fg"><label className="flabel">Categoría</label>
            <select className="fselect pj" value={f.categoria} onChange={e=>sf("categoria",e.target.value)}>
              {CATS.map(c=><option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="fg"><label className="flabel">Fecha</label><input className="finput pj" type="date" value={f.fecha} onChange={e=>sf("fecha",e.target.value)}/></div>
          <div className="fg"><label className="flabel">Monto ($)</label><input className="finput pj" type="number" value={f.monto} onChange={e=>sf("monto",e.target.value)}/></div>
          <div className="fg"><label className="flabel">Nota</label><textarea className="ftarea pj" value={f.nota} onChange={e=>sf("nota",e.target.value)}/></div>
        </div>
      </Modal>}
      {del&&<Confirm msg="¿Eliminar este gasto?" onOk={()=>{remove(del);setDel(null);}} onClose={()=>setDel(null)}/>}
    </div>
  );
};

const PjMovimientos = () => {
  const {data,upsert,remove}=useCrud(SK.pj_movs);
  const {m,open,close}=useModal(); const [del,setDel]=useState(null);
  const blank=(t="Ingreso")=>({id:uid(),tipo:t,descripcion:"",monto:0,fecha:today(),categoria:""});
  const [f,setF]=useState(blank()); const sf=(k,v)=>setF(p=>({...p,[k]:v}));
  const ing=data.filter(mv=>mv.tipo==="Ingreso").reduce((a,mv)=>a+Number(mv.monto||0),0);
  const egr=data.filter(mv=>mv.tipo==="Egreso").reduce((a,mv)=>a+Number(mv.monto||0),0);
  return (
    <div>
      <div className="sec-h"><h1 className="sec-title">MOVI<span className="hl-pj">MIENTOS</span></h1>
        <div style={{display:"flex",gap:8}}>
          <button className="btn btn-sec" onClick={()=>{setF(blank("Egreso"));open("new");}}>+ Egreso</button>
          <button className="btn btn-pj"  onClick={()=>{setF(blank("Ingreso"));open("new");}}>+ Ingreso</button>
        </div>
      </div>
      <div className="stats-grid" style={{gridTemplateColumns:"repeat(3,1fr)",maxWidth:520,marginBottom:18}}>
        <div className="stat-card stat-green"><div className="stat-label">Ingresos</div><div className="stat-val money" style={{fontSize:18}}>{fCLP(ing)}</div></div>
        <div className="stat-card stat-red">  <div className="stat-label">Egresos</div><div className="stat-val money" style={{fontSize:18}}>{fCLP(egr)}</div></div>
        <div className="stat-card stat-pj">   <div className="stat-label">Saldo</div><div className="stat-val money" style={{fontSize:18,color:ing-egr>=0?"var(--success)":"var(--danger)"}}>{fCLP(ing-egr)}</div></div>
      </div>
      <div className="card">
        {data.length===0?<div className="empty"><div className="empty-icon">💰</div><p>Sin movimientos</p></div>:(
          <div className="tw"><table>
            <thead><tr><th>Tipo</th><th>Descripción</th><th>Categoría</th><th>Fecha</th><th>Monto</th><th></th></tr></thead>
            <tbody>{[...data].sort((a,b)=>new Date(b.fecha)-new Date(a.fecha)).map(mv=><tr key={mv.id}>
              <td><Badge s={mv.tipo}/></td>
              <td><strong>{mv.descripcion}</strong></td>
              <td style={{color:"var(--muted)",fontSize:12}}>{mv.categoria||"—"}</td>
              <td style={{fontFamily:"var(--font-m)",fontSize:12,color:"var(--muted)"}}>{fDate(mv.fecha)}</td>
              <td className={`money ${mv.tipo==="Ingreso"?"pos":"neg"}`}>{mv.tipo==="Egreso"?"-":""}{fCLP(mv.monto)}</td>
              <td><div style={{display:"flex",gap:5}}>
                <button className="btn btn-sm btn-sec btn-ico" onClick={()=>{setF(mv);open("edit");}}>✏️</button>
                <button className="btn btn-sm btn-del btn-ico" onClick={()=>setDel(mv.id)}>🗑️</button>
              </div></td>
            </tr>)}</tbody>
          </table></div>
        )}
      </div>
      {m&&<Modal title={m==="new"?"Nuevo Movimiento":"Editar"} onClose={close}
        footer={<><button className="btn btn-sec" onClick={close}>Cancelar</button><button className="btn btn-pj" onClick={()=>{upsert(f);close();}}>Guardar</button></>}>
        <div className="fgrid fgrid2">
          <div className="fg" style={{gridColumn:"1/-1"}}><label className="flabel">Tipo</label>
            <div className="rgroup">{["Ingreso","Egreso"].map(t=><div key={t} className={`rbtn ${f.tipo===t?"sel-pj":""}`} onClick={()=>sf("tipo",t)}>{t}</div>)}</div>
          </div>
          <div className="fg" style={{gridColumn:"1/-1"}}><label className="flabel">Descripción</label><input className="finput pj" value={f.descripcion} onChange={e=>sf("descripcion",e.target.value)}/></div>
          <div className="fg"><label className="flabel">Categoría</label><input className="finput pj" value={f.categoria} onChange={e=>sf("categoria",e.target.value)}/></div>
          <div className="fg"><label className="flabel">Fecha</label><input className="finput pj" type="date" value={f.fecha} onChange={e=>sf("fecha",e.target.value)}/></div>
          <div className="fg"><label className="flabel">Monto ($)</label><input className="finput pj" type="number" value={f.monto} onChange={e=>sf("monto",e.target.value)}/></div>
        </div>
      </Modal>}
      {del&&<Confirm msg="¿Eliminar?" onOk={()=>{remove(del);setDel(null);}} onClose={()=>setDel(null)}/>}
    </div>
  );
};

const PjPagos = () => {
  const TIPOS=["Sueldos","Imposiciones","IVA","Materiales recurrentes","Arriendo","Servicios básicos","Contador","Otro"];
  const {data,upsert,remove}=useCrud(SK.pj_pagos);
  const {m,open,close}=useModal(); const [del,setDel]=useState(null);
  const blank=()=>({id:uid(),tipo:"",fecha:today(),monto:0,nota:""});
  const [f,setF]=useState(blank()); const sf=(k,v)=>setF(p=>({...p,[k]:v}));
  const total=data.reduce((a,p)=>a+Number(p.monto||0),0);
  return (
    <div>
      <div className="sec-h"><h1 className="sec-title">HISTORIAL DE <span className="hl-pj">PAGOS</span></h1><button className="btn btn-pj" onClick={()=>{setF(blank());open("new");}}>+ Agregar</button></div>
      <div className="stat-card stat-pj" style={{maxWidth:240,marginBottom:18}}><div className="stat-label">Total pagado</div><div className="stat-val money" style={{fontSize:22}}>{fCLP(total)}</div></div>
      <div className="card">
        {data.length===0?<div className="empty"><div className="empty-icon">📂</div><p>Sin pagos</p></div>:(
          <div className="tw"><table>
            <thead><tr><th>Tipo</th><th>Fecha</th><th>Monto</th><th>Nota</th><th></th></tr></thead>
            <tbody>{[...data].sort((a,b)=>new Date(b.fecha)-new Date(a.fecha)).map(p=><tr key={p.id}>
              <td><strong>{p.tipo}</strong></td>
              <td style={{fontFamily:"var(--font-m)",fontSize:12,color:"var(--muted)"}}>{fDate(p.fecha)}</td>
              <td className="money neg">{fCLP(p.monto)}</td>
              <td style={{color:"var(--muted)",fontSize:12}}>{p.nota||"—"}</td>
              <td><div style={{display:"flex",gap:5}}>
                <button className="btn btn-sm btn-sec btn-ico" onClick={()=>{setF(p);open("edit");}}>✏️</button>
                <button className="btn btn-sm btn-del btn-ico" onClick={()=>setDel(p.id)}>🗑️</button>
              </div></td>
            </tr>)}</tbody>
          </table></div>
        )}
      </div>
      {m&&<Modal title={m==="new"?"Nuevo Pago":"Editar"} onClose={close}
        footer={<><button className="btn btn-sec" onClick={close}>Cancelar</button><button className="btn btn-pj" onClick={()=>{upsert(f);close();}}>Guardar</button></>}>
        <div className="fgrid fgrid2">
          <div className="fg"><label className="flabel">Tipo</label>
            <select className="fselect pj" value={f.tipo} onChange={e=>sf("tipo",e.target.value)}>
              <option value="">Seleccionar...</option>
              {TIPOS.map(t=><option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div className="fg"><label className="flabel">Fecha</label><input className="finput pj" type="date" value={f.fecha} onChange={e=>sf("fecha",e.target.value)}/></div>
          <div className="fg"><label className="flabel">Monto ($)</label><input className="finput pj" type="number" value={f.monto} onChange={e=>sf("monto",e.target.value)}/></div>
          <div className="fg"><label className="flabel">Nota</label><textarea className="ftarea pj" value={f.nota} onChange={e=>sf("nota",e.target.value)}/></div>
        </div>
      </Modal>}
      {del&&<Confirm msg="¿Eliminar este pago?" onOk={()=>{remove(del);setDel(null);}} onClose={()=>setDel(null)}/>}
    </div>
  );
};

// ─── NAV CONFIG ───────────────────────────────────────────────────────────────
const NAV = [
  { section:"🚛 TRANSPORTES", color:"var(--tr)", dot:"#f5a623", items:[
    { id:"tr_dash",   label:"Dashboard",          icon:"📊" },
    { id:"tr_rutas",  label:"Rutas",              icon:"🗺️" },
    { id:"tr_fact",   label:"Facturas",           icon:"🧾" },
    { id:"tr_cxp",    label:"Cuentas por Pagar",  icon:"💳" },
    { id:"tr_movs",   label:"Movimientos",        icon:"💰" },
    { id:"tr_pagos",  label:"Historial Pagos",    icon:"📋" },
  ]},
  { section:"🌿 PAISAJISMO", color:"var(--pj)", dot:"#4caf6e", items:[
    { id:"pj_dash",   label:"Dashboard",          icon:"📊" },
    { id:"pj_cli",    label:"Clientes",           icon:"👥" },
    { id:"pj_cots",   label:"Cotizaciones",       icon:"📋" },
    { id:"pj_proy",   label:"Proyectos",          icon:"🏗️" },
    { id:"pj_fact",   label:"Facturas",           icon:"🧾" },
    { id:"pj_gastos", label:"Gastos",             icon:"💸" },
    { id:"pj_movs",   label:"Movimientos",        icon:"💰" },
    { id:"pj_pagos",  label:"Historial Pagos",    icon:"📂" },
  ]},
];

const PAGES = {
  tr_dash: { title:"TRANSPORTES — DASHBOARD", pill:"tr", comp:<TrDashboard/> },
  tr_rutas:{ title:"RUTAS",                   pill:"tr", comp:<TrRutas/> },
  tr_fact: { title:"FACTURAS",                pill:"tr", comp:<TrFacturas/> },
  tr_cxp:  { title:"CUENTAS POR PAGAR",       pill:"tr", comp:<TrCxP/> },
  tr_movs: { title:"MOVIMIENTOS",             pill:"tr", comp:<TrMovimientos/> },
  tr_pagos:{ title:"HISTORIAL DE PAGOS",      pill:"tr", comp:<TrPagos/> },
  pj_dash: { title:"PAISAJISMO — DASHBOARD",  pill:"pj", comp:<PjDashboard/> },
  pj_cli:  { title:"CLIENTES",               pill:"pj", comp:<PjClientes/> },
  pj_cots: { title:"COTIZACIONES",           pill:"pj", comp:<PjCotizaciones/> },
  pj_proy: { title:"PROYECTOS",              pill:"pj", comp:<PjProyectos/> },
  pj_fact: { title:"FACTURAS",              pill:"pj", comp:<PjFacturas/> },
  pj_gastos:{ title:"GASTOS",              pill:"pj", comp:<PjGastos/> },
  pj_movs: { title:"MOVIMIENTOS",          pill:"pj", comp:<PjMovimientos/> },
  pj_pagos:{ title:"HISTORIAL DE PAGOS",   pill:"pj", comp:<PjPagos/> },
};

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
export default function App() {
  const [user,setUser]=useState(()=>{try{return JSON.parse(localStorage.getItem(SK.auth));}catch{return null;}});
  const [page,setPage]=useState("tr_dash");
  const [sb,setSb]=useState(true);
  const logout=()=>{localStorage.removeItem(SK.auth);setUser(null);};

  if (!user) return <><style>{CSS}</style><Login onLogin={setUser}/></>;

  const cur = PAGES[page];
  const isTr = cur?.pill==="tr";

  return (
    <>
      <style>{CSS}</style>
      <div className="app">
        {/* SIDEBAR */}
        <nav className={`sidebar ${sb?"":"closed"}`}>
          <div className="sb-logo">
            <div className="sb-logo-top">
              <div className="sb-logo-icon" style={{background:"linear-gradient(135deg,var(--tr),var(--pj))"}}>⚡</div>
              <div className="sb-logo-name">SISTEMA<br/>CHARLY</div>
            </div>
            <div className="sb-logo-sub">GESTIÓN EMPRESARIAL</div>
          </div>

          <div style={{flex:1,overflowY:"auto"}}>
            {NAV.map(group=>(
              <div key={group.section}>
                <div className="sb-section" style={{color:group.dot}}>
                  <div className="sb-section-dot" style={{background:group.dot}}/>
                  {group.section}
                </div>
                {group.items.map(item=>{
                  const isTrItem=item.id.startsWith("tr");
                  const activeClass=page===item.id?(isTrItem?"active-tr":"active-pj"):"";
                  return <div key={item.id} className={`nav-item ${activeClass}`} onClick={()=>setPage(item.id)}>
                    <span>{item.icon}</span>{item.label}
                  </div>;
                })}
              </div>
            ))}
          </div>

          <div className="sb-footer">
            <div className="sb-user">{user.name}</div>
            <button className="btn btn-sec btn-sm" style={{width:"100%",justifyContent:"center",fontSize:12}} onClick={logout}>Cerrar sesión</button>
          </div>
        </nav>

        {/* TOPBAR */}
        <header className={`topbar ${sb?"":"full"}`}>
          <button className="menu-btn" onClick={()=>setSb(s=>!s)}>☰</button>
          <span className="topbar-title">{cur?.title}</span>
          <span className={`topbar-pill ${isTr?"pill-tr":"pill-pj"}`}>
            {isTr?"🚛 Transportes":"🌿 Paisajismo"}
          </span>
        </header>

        {/* MAIN */}
        <main className={`main ${sb?"":"full"}`}>
          <div className="page">
            {cur?.comp}
          </div>
        </main>
      </div>
    </>
  );
}