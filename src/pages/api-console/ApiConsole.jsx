import React, { useCallback, useEffect, useRef, useState } from 'react';
import { resolve, COLLECTION } from './mock-server.js';

/* ------------------------------------------------------------------ */
/*  Helpers & Constants                                                */
/* ------------------------------------------------------------------ */

const BASE_URL = 'https://api.rayaan.dev';

const METHOD_COLORS = {
  GET: '#0cbb52',
  POST: '#ffb400',
  PUT: '#097bed',
  PATCH: '#212121',
  DELETE: '#eb2013',
};

const escapeHtml = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function highlight(value) {
  const json = JSON.stringify(value, null, 2);
  return escapeHtml(json).replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false)\b|\bnull\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g,
    (match) => {
      let cls = 'pm-num';
      if (/^"/.test(match)) cls = /:$/.test(match) ? 'pm-key' : 'pm-str';
      else if (/true|false/.test(match)) cls = 'pm-bool';
      else if (/null/.test(match)) cls = 'pm-null';
      return `<span class="${cls}">${match}</span>`;
    }
  );
}

const bytes = (n) => (n < 1024 ? `${n} B` : `${(n / 1024).toFixed(2)} KB`);

const randomId = () =>
  'req_' + Math.random().toString(36).slice(2, 10) + Math.random().toString(36).slice(2, 6);

function statusStyle(code) {
  if (code >= 200 && code < 300) return 'text-[#0cbb52]';
  if (code >= 300 && code < 400) return 'text-[#097bed]';
  if (code >= 400 && code < 500) return 'text-[#ffb400]';
  return 'text-[#eb2013]';
}

/* ------------------------------------------------------------------ */
/*  Small Presentational Components                                   */
/* ------------------------------------------------------------------ */

function MethodBadge({ method, small }) {
  return (
    <span
      className={`font-mono font-bold ${small ? 'text-[10px]' : 'text-xs'}`}
      style={{ color: METHOD_COLORS[method] || '#a6a6a6' }}
    >
      {method}
    </span>
  );
}

function KeyValEditor({ rows, setRows }) {
  const updateRow = (index, field, val) => {
    const next = [...rows];
    next[index][field] = val;
    setRows(next);
  };

  const toggleRow = (index) => {
    const next = [...rows];
    next[index].active = !next[index].active;
    setRows(next);
  };

  return (
    <div className="w-full border border-[#383838] bg-[#212121] text-xs font-mono text-[#e6e6e6]">
      <div className="flex border-b border-[#383838] bg-[#2b2b2b] text-[11px] font-sans font-semibold text-[#a6a6a6]">
        <div className="w-8 border-r border-[#383838] p-1.5 text-center"></div>
        <div className="flex-1 border-r border-[#383838] px-3 py-1.5">KEY</div>
        <div className="flex-1 border-r border-[#383838] px-3 py-1.5">VALUE</div>
        <div className="flex-1 px-3 py-1.5">DESCRIPTION</div>
      </div>
      {rows.map((r, i) => (
        <div key={i} className="flex border-b border-[#383838] last:border-b-0 hover:bg-[#282828]">
          <div className="flex w-8 items-center justify-center border-r border-[#383838] p-1.5">
            <input
              type="checkbox"
              checked={r.active}
              onChange={() => toggleRow(i)}
              className="h-3 w-3 accent-[#ff6c37]"
            />
          </div>
          <div className="flex-1 border-r border-[#383838]">
            <input
              type="text"
              value={r.key}
              onChange={(e) => updateRow(i, 'key', e.target.value)}
              placeholder="Key"
              className="w-full bg-transparent px-3 py-1.5 text-[#e6e6e6] outline-none placeholder:text-[#6b6b6b]"
            />
          </div>
          <div className="flex-1 border-r border-[#383838]">
            <input
              type="text"
              value={r.value}
              onChange={(e) => updateRow(i, 'value', e.target.value)}
              placeholder="Value"
              className="w-full bg-transparent px-3 py-1.5 text-[#e6e6e6] outline-none placeholder:text-[#6b6b6b]"
            />
          </div>
          <div className="flex-1">
            <input
              type="text"
              value={r.description || ''}
              onChange={(e) => updateRow(i, 'description', e.target.value)}
              placeholder="Description"
              className="w-full bg-transparent px-3 py-1.5 text-[#a6a6a6] outline-none placeholder:text-[#6b6b6b]"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Console Component                                             */
/* ------------------------------------------------------------------ */

export default function ApiConsole() {
  const [method, setMethod] = useState('GET');
  const [path, setPath] = useState('/api/v1/profile');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [reqTab, setReqTab] = useState('Params');
  const [resTab, setResTab] = useState('Body');
  const [bodyView, setBodyView] = useState('Pretty');
  const [history, setHistory] = useState([]);
  const [copied, setCopied] = useState(false);
  const [params, setParams] = useState([
    { active: true, key: 'limit', value: '10', description: 'Page size' },
    { active: false, key: 'page', value: '1', description: 'Page number' },
  ]);
  const [headers, setHeaders] = useState([
    { active: true, key: 'Accept', value: 'application/json', description: '' },
    { active: true, key: 'User-Agent', value: 'PostmanRuntime/7.32.3', description: '' },
  ]);

  const activeKey = `${method} ${path}`;

  const send = useCallback(async () => {
    setLoading(true);
    setResponse(null);

    const start = performance.now();
    const delay = 140 + Math.random() * 360;
    await new Promise((r) => setTimeout(r, delay));

    const result = resolve(method, path);
    const timeMs = Math.round(performance.now() - start);
    const bodyStr = JSON.stringify(result.data);
    const size = new Blob([bodyStr]).size;
    const requestId = randomId();

    const resHeaders = [
      ['Content-Type', 'application/json; charset=utf-8'],
      ['Content-Length', String(size)],
      ['Server', 'rayaan-edge/2.1'],
      ['X-Powered-By', 'framer-motion-portfolio'],
      ['Cache-Control', 'public, max-age=60'],
      ['X-Request-Id', requestId],
      ['X-Response-Time', `${timeMs}ms`],
      ['Access-Control-Allow-Origin', '*'],
      ['Date', new Date().toUTCString()],
    ];

    setResponse({ ...result, timeMs, size, requestId, headers: resHeaders });
    setLoading(false);
    setHistory((h) =>
      [{ id: requestId, method, path, status: result.status, timeMs }, ...h].slice(0, 12)
    );
  }, [method, path]);

  useEffect(() => {
    send();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        e.preventDefault();
        send();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [send]);

  const pendingSend = useRef(false);
  useEffect(() => {
    if (pendingSend.current) {
      pendingSend.current = false;
      send();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [method, path]);

  const pickRequest = (m, p) => {
    pendingSend.current = true;
    setMethod(m);
    setPath(p);
  };

  const copyBody = async () => {
    if (!response) return;
    try {
      await navigator.clipboard.writeText(JSON.stringify(response.data, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      /* clipboard error */
    }
  };

  return (
    <div className="flex h-screen w-full flex-col bg-[#1c1c1c] font-sans text-[#e6e6e6] antialiased">
      <style>{`
        .pm-key  { color: #00d2ff; }
        .pm-str  { color: #7ec699; }
        .pm-num  { color: #f08d49; }
        .pm-bool { color: #cc99cd; }
        .pm-null { color: #f82b60; }
        .thin-scroll::-webkit-scrollbar { width: 6px; height: 6px; }
        .thin-scroll::-webkit-scrollbar-thumb { background: #383838; }
        .thin-scroll::-webkit-scrollbar-track { background: transparent; }
      `}</style>

      {/* Top Header / App Bar */}
      <header className="flex h-10 shrink-0 items-center justify-between border-b border-[#2b2b2b] bg-[#212121] px-3">
        <div className="flex items-center gap-3">
          <div className="flex h-5 w-5 items-center justify-center rounded bg-[#ff6c37]">
            <svg className="h-3 w-3 fill-white" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <span className="text-xs font-semibold text-[#e6e6e6]">Rayaan API Console</span>
          <span className="rounded bg-[#383838] px-1.5 py-0.5 text-[10px] text-[#a6a6a6]">
            v1.0.0
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 rounded bg-[#2b2b2b] px-2 py-1 text-[11px] text-[#a6a6a6]">
            <span className="h-2 w-2 rounded-full bg-[#0cbb52]" />
            <span>My Workspace</span>
          </div>
          <a
            href="/"
            className="rounded bg-[#2b2b2b] px-2 py-1 text-[11px] text-[#a6a6a6] hover:bg-[#383838] hover:text-white"
          >
            ← Portfolio
          </a>
        </div>
      </header>

      <div className="flex min-h-0 flex-1">
        {/* Left Sidebar */}
        <aside className="thin-scroll hidden w-64 shrink-0 flex-col overflow-y-auto border-r border-[#2b2b2b] bg-[#212121] md:flex">
          <div className="flex items-center border-b border-[#2b2b2b] px-3 py-2">
            <span className="text-[11px] font-bold text-[#a6a6a6] uppercase tracking-wider">
              Collections
            </span>
          </div>

          <div className="flex-1 py-1">
            {COLLECTION.map((folder) => (
              <div key={folder.name} className="mb-1">
                <div className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-[#a6a6a6]">
                  <span>📁</span>
                  <span>{folder.name}</span>
                </div>
                <div>
                  {folder.requests.map((r) => {
                    const key = `${r.method} ${r.path}`;
                    const active = key === activeKey;
                    return (
                      <button
                        key={key}
                        onClick={() => pickRequest(r.method, r.path)}
                        className={`flex w-full items-center gap-2 px-6 py-1 text-left text-xs ${
                          active
                            ? 'bg-[#2b2b2b] text-white font-medium'
                            : 'text-[#a6a6a6] hover:bg-[#282828] hover:text-[#e6e6e6]'
                        }`}
                      >
                        <MethodBadge method={r.method} small />
                        <span className="truncate">{r.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* History */}
          {history.length > 0 && (
            <div className="border-t border-[#2b2b2b] p-3">
              <span className="text-[10px] font-bold text-[#a6a6a6] uppercase tracking-wider">
                History
              </span>
              <div className="mt-2 space-y-1">
                {history.slice(0, 5).map((h) => (
                  <div key={h.id} className="flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-1.5 truncate">
                      <MethodBadge method={h.method} small />
                      <span className="truncate text-[#a6a6a6]">{h.path}</span>
                    </div>
                    <span className={statusStyle(h.status)}>{h.status}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </aside>

        {/* Main Work Area */}
        <main className="flex min-w-0 flex-1 flex-col bg-[#1c1c1c]">
          {/* Postman Active Request Tab */}
          <div className="flex h-9 border-b border-[#2b2b2b] bg-[#212121]">
            <div className="flex items-center gap-2 border-r border-[#2b2b2b] bg-[#1c1c1c] px-3 text-xs text-white">
              <MethodBadge method={method} small />
              <span className="max-w-[140px] truncate font-medium">{path}</span>
              <span className="cursor-pointer text-[#a6a6a6] hover:text-white">×</span>
            </div>
          </div>

          {/* Request URL Bar */}
          <div className="flex items-center gap-2 p-3 bg-[#212121] border-b border-[#2b2b2b]">
            <div className="flex flex-1 items-center border border-[#383838] bg-[#1c1c1c] rounded">
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                className="cursor-pointer bg-transparent px-3 py-1.5 text-xs font-bold outline-none border-r border-[#383838]"
                style={{ color: METHOD_COLORS[method] || '#a6a6a6' }}
              >
                {['GET', 'POST', 'PUT', 'PATCH', 'DELETE'].map((m) => (
                  <option key={m} value={m} className="bg-[#212121] text-[#e6e6e6]">
                    {m}
                  </option>
                ))}
              </select>
              <span className="select-none pl-3 text-xs text-[#a6a6a6]">{BASE_URL}</span>
              <input
                value={path}
                onChange={(e) => setPath(e.target.value)}
                spellCheck={false}
                className="w-full bg-transparent px-1 py-1.5 text-xs text-white outline-none font-mono"
              />
            </div>

            <button
              onClick={send}
              disabled={loading}
              className="flex items-center justify-center rounded bg-[#097bed] px-6 py-1.5 text-xs font-bold text-white hover:bg-[#006bd6] disabled:opacity-50"
            >
              {loading ? (
                <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                'Send'
              )}
            </button>
          </div>

          {/* Request Sub-tabs (Params, Authorization, Headers, Body) */}
          <div className="border-b border-[#2b2b2b] bg-[#212121] px-3">
            <div className="flex gap-6 text-xs text-[#a6a6a6]">
              {['Params', 'Authorization', 'Headers', 'Body'].map((t) => (
                <button
                  key={t}
                  onClick={() => setReqTab(t)}
                  className={`py-2 transition-colors relative ${
                    reqTab === t ? 'text-white font-medium' : 'hover:text-[#e6e6e6]'
                  }`}
                >
                  {t}
                  {t === 'Params' && (
                    <span className="ml-1 text-[10px] text-[#ff6c37]">
                      ({params.filter((p) => p.active).length})
                    </span>
                  )}
                  {t === 'Headers' && (
                    <span className="ml-1 text-[10px] text-[#0cbb52]">
                      ({headers.filter((h) => h.active).length})
                    </span>
                  )}
                  {reqTab === t && (
                    <span className="absolute inset-x-0 bottom-0 h-0.5 bg-[#ff6c37]" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Request Tab Body */}
          <div className="p-3 bg-[#1c1c1c] border-b border-[#2b2b2b]">
            {reqTab === 'Params' && <KeyValEditor rows={params} setRows={setParams} />}
            {reqTab === 'Authorization' && (
              <div className="text-xs text-[#a6a6a6] font-mono">
                Type: <span className="text-white">Bearer Token</span> | Token:{' '}
                <span className="text-[#00d2ff]">demo_pk_live_rayaan_read_only</span>
              </div>
            )}
            {reqTab === 'Headers' && <KeyValEditor rows={headers} setRows={setHeaders} />}
            {reqTab === 'Body' && (
              <div className="text-xs text-[#a6a6a6] font-mono">
                {method === 'GET'
                  ? 'This request does not carry a body.'
                  : 'raw (json) — read-only endpoint.'}
              </div>
            )}
          </div>

          {/* Response Section */}
          <div className="flex min-h-0 flex-1 flex-col bg-[#1c1c1c]">
            {/* Status Bar */}
            <div className="flex items-center justify-between border-b border-[#2b2b2b] bg-[#212121] px-3 py-1.5 text-xs">
              <span className="font-semibold text-[#a6a6a6]">Response</span>
              {response && !loading && (
                <div className="flex items-center gap-4 text-xs font-mono">
                  <span>
                    Status:{' '}
                    <span className={`font-bold ${statusStyle(response.status)}`}>
                      {response.status} {response.statusText}
                    </span>
                  </span>
                  <span>
                    Time: <span className="text-[#0cbb52]">{response.timeMs} ms</span>
                  </span>
                  <span>
                    Size: <span className="text-[#097bed]">{bytes(response.size)}</span>
                  </span>
                </div>
              )}
            </div>

            {/* Response Sub-tabs */}
            <div className="flex items-center justify-between border-b border-[#2b2b2b] bg-[#212121] px-3">
              <div className="flex gap-6 text-xs text-[#a6a6a6]">
                {['Body', 'Headers', 'Cookies'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setResTab(t)}
                    className={`py-2 transition-colors relative ${
                      resTab === t ? 'text-white font-medium' : 'hover:text-[#e6e6e6]'
                    }`}
                  >
                    {t}
                    {resTab === t && (
                      <span className="absolute inset-x-0 bottom-0 h-0.5 bg-[#ff6c37]" />
                    )}
                  </button>
                ))}
              </div>

              {resTab === 'Body' && (
                <div className="flex items-center gap-2 py-1 text-xs">
                  {['Pretty', 'Raw'].map((v) => (
                    <button
                      key={v}
                      onClick={() => setBodyView(v)}
                      className={`px-2 py-0.5 rounded text-[11px] ${
                        bodyView === v ? 'bg-[#383838] text-white' : 'text-[#a6a6a6]'
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                  <button
                    onClick={copyBody}
                    className="rounded bg-[#2b2b2b] px-2 py-0.5 text-[11px] text-[#a6a6a6] hover:bg-[#383838] hover:text-white"
                  >
                    {copied ? '✓ Copied' : 'Copy'}
                  </button>
                </div>
              )}
            </div>

            {/* Response Viewer Output */}
            <div className="thin-scroll min-h-0 flex-1 overflow-auto bg-[#1c1c1c] p-3">
              {loading && (
                <div className="flex h-full flex-col items-center justify-center gap-2 text-xs text-[#a6a6a6]">
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-[#ff6c37] border-t-transparent" />
                  <span>Sending Request...</span>
                </div>
              )}

              {!loading && response && resTab === 'Body' && (
                <pre className="font-mono text-xs leading-relaxed text-[#e6e6e6]">
                  {bodyView === 'Pretty' ? (
                    <code dangerouslySetInnerHTML={{ __html: highlight(response.data) }} />
                  ) : (
                    <code>{JSON.stringify(response.data)}</code>
                  )}
                </pre>
              )}

              {!loading && response && resTab === 'Headers' && (
                <table className="w-full text-left font-mono text-xs">
                  <thead>
                    <tr className="border-b border-[#2b2b2b] text-[#a6a6a6]">
                      <th className="py-1">KEY</th>
                      <th className="py-1">VALUE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {response.headers.map(([k, v]) => (
                      <tr key={k} className="border-b border-[#212121]">
                        <td className="py-1 text-[#00d2ff]">{k}</td>
                        <td className="py-1 text-[#e6e6e6]">{v}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {!loading && response && resTab === 'Cookies' && (
                <div className="text-xs text-[#a6a6a6] font-mono">No cookies return from server.</div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}