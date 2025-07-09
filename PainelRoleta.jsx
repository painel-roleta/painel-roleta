
import { useState } from "react";

const vermelho = [1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36];
const preto = [2,4,6,8,10,11,13,15,17,20,22,24,26,28,29,31,33,35];

export default function PainelRoleta() {
  const [entrada, setEntrada] = useState("");
  const [historico, setHistorico] = useState([]);

  const adicionarNumero = () => {
    const numero = parseInt(entrada);
    if (!isNaN(numero) && numero >= 0 && numero <= 36) {
      setHistorico(prev => [numero, ...prev.slice(0, 19)]);
      setEntrada("");
    }
  };

  const resetar = () => {
    setHistorico([]);
  };

  const contar = (tipo) => historico.filter(n => tipo.includes(n)).length;
  const contarZero = () => historico.filter(n => n === 0).length;

  const frequencias = historico.reduce((acc, n) => {
    acc[n] = (acc[n] || 0) + 1;
    return acc;
  }, {});

  const topNumeros = Object.entries(frequencias)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <div className="p-6 space-y-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold text-center">🎰 Painel de Análise da Roleta</h1>

      <div className="flex gap-2">
        <input
          className="border px-2 py-1 rounded w-full"
          placeholder="Digite um número (0-36)"
          value={entrada}
          onChange={(e) => setEntrada(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && adicionarNumero()}
        />
        <button className="bg-blue-600 text-white px-4 py-1 rounded" onClick={adicionarNumero}>Adicionar</button>
        <button className="bg-red-600 text-white px-4 py-1 rounded" onClick={resetar}>Resetar</button>
      </div>

      <div className="bg-white p-4 rounded shadow space-y-2">
        <h2 className="font-semibold">Últimos números:</h2>
        <div className="flex flex-wrap gap-2">
          {historico.map((n, i) => (
            <span key={i} className={
              `px-2 py-1 rounded text-white text-sm font-bold ${
                vermelho.includes(n) ? 'bg-red-500' :
                preto.includes(n) ? 'bg-black' : 'bg-green-600'
              }`}>
              {n}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-2">Estatísticas</h2>
          <p>🔴 Vermelho: {contar(vermelho)}</p>
          <p>⚫ Preto: {contar(preto)}</p>
          <p>🟢 Zero: {contarZero()}</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-2">🔥 Top 5 números</h2>
          <ul>
            {topNumeros.map(([n, freq]) => (
              <li key={n}>🎯 {n}: {freq}x</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
