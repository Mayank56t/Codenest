function CompilerButton() {
  const COMPILER_URL = "https://www.programiz.com/java-programming/online-compiler/";

  function handleClick() {
    window.open(COMPILER_URL, "_blank", "noopener,noreferrer");
  }

  return (
    <button
      className="compiler-fab"
      onClick={handleClick}
      title="Open Java Compiler"
    >
      <span className="compiler-fab-icon">{"</>"}</span>
      <span className="compiler-fab-label">Java Compiler</span>
    </button>
  );
}

export default CompilerButton;
