import { useState, useEffect } from "react";
import { Plus, TrendingUp, X, Check } from "lucide-react";

const PALETTE = {
  navy: "#1B2A4A",
  navyDeep: "#101B33",
  paper: "#F6F1E4",
  paperDim: "#EDE5D0",
  gold: "#C9A227",
  ink: "#2B2118",
  forest: "#33513F",
  coral: "#B5555C",
};

const STORAGE_KEY = "savings-ledger-goals";

function currency(n) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

function loadGoals() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn("Could not load saved goals", e);
  }
  return [
    { id: 1, name: "New bike", target: 300, saved: 120 },
    { id: 2, name: "Concert tickets", target: 150, saved: 150 },
  ];
}

function StampBadge({ complete }) {
  if (!complete) return null;
  return (
    <div
      style={{
        position: "absolute",
        top: 10,
        right: 14,
        transform: "rotate(-9deg)",
        border: `2px solid ${PALETTE.forest}`,
        color: PALETTE.forest,
        borderRadius: 6,
        padding: "3px 8px",
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: "0.08em",
        opacity: 0.85,
      }}
    >
      PAID IN FULL
    </div>
  );
}

function GoalRow({ goal, onDeposit, onDelete }) {
  const [amount, setAmount] = useState("");
  const pct = Math.min(100, Math.round((goal.saved / goal.target) * 100));
  const complete = goal.saved >= goal.target;

  const submit = () => {
    const n = parseFloat(amount);
    if (!isNaN(n) && n !== 0) {
      onDeposit(goal.id, n);
      setAmount("");
    }
  };

  return (
    <div
      style={{
        position: "relative",
        background: PALETTE.paper,
        border: `1px solid ${PALETTE.paperDim}`,
        borderLeft: `4px solid ${complete ? PALETTE.forest : PALETTE.gold}`,
        padding: "18px 20px",
        marginBottom: 14,
        borderRadius: 4,
      }}
    >
      <StampBadge complete={complete} />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4 }}>
        <h3
          style={{
            fontFamily: "'Fraunces', serif",
            fontSize: 20,
            fontWeight: 600,
            color: PALETTE.ink,
            margin: 0,
          }}
        >
          {goal.name}
        </h3>
        <button
          onClick={() => onDelete(goal.id)}
          aria-label={`Remove ${goal.name}`}
          style={{
            background: "none",
            border: "none",
            color: PALETTE.ink,
            opacity: 0.35,
            cursor: "pointer",
            padding: 4,
          }}
        >
          <X size={16} />
        </button>
      </div>

      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 13,
          color: PALETTE.ink,
          opacity: 0.75,
          marginBottom: 10,
        }}
      >
        {currency(goal.saved)} of {currency(goal.target)} · {pct}%
      </div>

      <div
        style={{
          height: 8,
          background: PALETTE.paperDim,
          borderRadius: 2,
          overflow: "hidden",
          marginBottom: 14,
          border: `1px solid ${PALETTE.ink}22`,
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${pct}%`,
            background: complete ? PALETTE.forest : PALETTE.gold,
            transition: "width 0.4s ease",
          }}
        />
      </div>

      {!complete && (
        <div style={{ display: "flex", gap: 8 }}>
          <input
            type="number"
            inputMode="decimal"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            placeholder="Amount"
            style={{
              flex: 1,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 14,
              padding: "8px 10px",
              border: `1px solid ${PALETTE.ink}33`,
              background: "#fff",
              color: PALETTE.ink,
              borderRadius: 3,
            }}
          />
          <button
            onClick={submit}
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 13,
              fontWeight: 700,
              padding: "8px 14px",
              background: PALETTE.navy,
              color: PALETTE.paper,
              border: "none",
              borderRadius: 3,
              cursor: "pointer",
              letterSpacing: "0.03em",
            }}
          >
            DEPOSIT
          </button>
        </div>
      )}
      {complete && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            color: PALETTE.forest,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 13,
            fontWeight: 600,
          }}
        >
          <Check size={15} /> Goal reached
        </div>
      )}
    </div>
  );
}

function AddGoalForm({ onAdd, onCancel }) {
  const [name, setName] = useState("");
  const [target, setTarget] = useState("");

  const submit = () => {
    const t = parseFloat(target);
    if (name.trim() && !isNaN(t) && t > 0) {
      onAdd(name.trim(), t);
      setName("");
      setTarget("");
    }
  };

  return (
    <div
      style={{
        background: PALETTE.paper,
        border: `1px dashed ${PALETTE.ink}44`,
        padding: 18,
        marginBottom: 14,
        borderRadius: 4,
      }}
    >
      <div style={{ display: "flex", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="What are you saving for?"
          style={{
            flex: "2 1 160px",
            fontFamily: "'Inter', sans-serif",
            fontSize: 14,
            padding: "9px 10px",
            border: `1px solid ${PALETTE.ink}33`,
            background: "#fff",
            color: PALETTE.ink,
            borderRadius: 3,
          }}
        />
        <input
          type="number"
          inputMode="decimal"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          placeholder="Goal amount"
          style={{
            flex: "1 1 110px",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 14,
            padding: "9px 10px",
            border: `1px solid ${PALETTE.ink}33`,
            background: "#fff",
            color: PALETTE.ink,
            borderRadius: 3,
          }}
        />
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <button
          onClick={submit}
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 13,
            fontWeight: 700,
            padding: "8px 14px",
            background: PALETTE.gold,
            color: PALETTE.navyDeep,
            border: "none",
            borderRadius: 3,
            cursor: "pointer",
          }}
        >
          ADD GOAL
        </button>
        <button
          onClick={onCancel}
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 13,
            padding: "8px 14px",
            background: "none",
            color: PALETTE.ink,
            border: `1px solid ${PALETTE.ink}33`,
            borderRadius: 3,
            cursor: "pointer",
          }}
        >
          CANCEL
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const [goals, setGoals] = useState(loadGoals);
  const [adding, setAdding] = useState(false);
  const [nextId, setNextId] = useState(() => {
    const loaded = loadGoals();
    return loaded.length ? Math.max(...loaded.map((g) => g.id)) + 1 : 1;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(goals));
    } catch (e) {
      console.warn("Could not save goals", e);
    }
  }, [goals]);

  const totalSaved = goals.reduce((s, g) => s + g.saved, 0);
  const totalTarget = goals.reduce((s, g) => s + g.target, 0);

  const addGoal = (name, target) => {
    setGoals([...goals, { id: nextId, name, target, saved: 0 }]);
    setNextId(nextId + 1);
    setAdding(false);
  };

  const deposit = (id, amount) => {
    setGoals(goals.map((g) => (g.id === id ? { ...g, saved: Math.max(0, g.saved + amount) } : g)));
  };

  const deleteGoal = (id) => setGoals(goals.filter((g) => g.id !== id));

  return (
    <div
      style={{
        minHeight: "100vh",
        background: PALETTE.navyDeep,
        padding: "28px 16px",
        fontFamily: "'Inter', sans-serif",
        boxSizing: "border-box",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;600;700&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; }
        input::placeholder { color: ${PALETTE.ink}88; }
        button:focus-visible, input:focus-visible { outline: 2px solid ${PALETTE.gold}; outline-offset: 2px; }
      `}</style>

      <div style={{ maxWidth: 520, margin: "0 auto" }}>
        <div
          style={{
            background: PALETTE.navy,
            border: `1px solid ${PALETTE.gold}55`,
            borderRadius: "4px 4px 0 0",
            padding: "22px 24px",
          }}
        >
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              letterSpacing: "0.18em",
              color: PALETTE.gold,
              marginBottom: 6,
            }}
          >
            SAVINGS PASSBOOK
          </div>
          <h1
            style={{
              fontFamily: "'Fraunces', serif",
              fontWeight: 700,
              fontSize: 30,
              color: PALETTE.paper,
              margin: 0,
              marginBottom: 16,
            }}
          >
            Your Goals
          </h1>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            <div>
              <div style={{ fontSize: 11, color: `${PALETTE.paper}99`, fontFamily: "'JetBrains Mono', monospace" }}>
                SAVED
              </div>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 20,
                  fontWeight: 700,
                  color: PALETTE.paper,
                }}
              >
                {currency(totalSaved)}
              </div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: `${PALETTE.paper}99`, fontFamily: "'JetBrains Mono', monospace" }}>
                TARGET
              </div>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 20,
                  fontWeight: 700,
                  color: PALETTE.paper,
                }}
              >
                {currency(totalTarget)}
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 4, color: PALETTE.gold, marginLeft: "auto" }}>
              <TrendingUp size={16} />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, fontWeight: 700 }}>
                {totalTarget > 0 ? Math.round((totalSaved / totalTarget) * 100) : 0}%
              </span>
            </div>
          </div>
        </div>

        <div style={{ padding: "20px 0 4px" }}>
          {goals.length === 0 && !adding && (
            <div
              style={{
                textAlign: "center",
                padding: "30px 16px",
                color: `${PALETTE.paper}99`,
                fontFamily: "'Inter', sans-serif",
                fontSize: 14,
              }}
            >
              No goals yet. Add your first one below.
            </div>
          )}
          {goals.map((g) => (
            <GoalRow key={g.id} goal={g} onDeposit={deposit} onDelete={deleteGoal} />
          ))}

          {adding ? (
            <AddGoalForm onAdd={addGoal} onCancel={() => setAdding(false)} />
          ) : (
            <button
              onClick={() => setAdding(true)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: "0.04em",
                padding: "12px",
                background: "none",
                color: PALETTE.gold,
                border: `1px dashed ${PALETTE.gold}88`,
                borderRadius: 3,
                cursor: "pointer",
              }}
            >
              <Plus size={16} /> ADD A GOAL
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
