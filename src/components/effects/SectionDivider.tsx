export default function SectionDivider() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "20px 0" }}>
      <div style={{ height: "1px", flex: 1, background: "linear-gradient(to right, transparent, var(--color-border))" }} />
      <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "var(--color-primary)", margin: "0 16px" }} />
      <div style={{ height: "1px", flex: 1, background: "linear-gradient(to left, transparent, var(--color-border))" }} />
    </div>
  );
}
