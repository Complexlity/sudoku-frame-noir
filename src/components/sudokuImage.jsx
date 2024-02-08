// Fallback fonts and Emoji are dynamically loaded
// from Google Fonts and CDNs in this demo.

// You can also return a function component in the playground.

export default function SudokuBoard() {
const sudokuArray = [
    5, 3, 0, 0, 7, 0, 0, 0, 0,
    6, 0, 0, 1, 9, 5, 0, 0, 0,
    0, 9, 8, 0, 0, 0, 0, 6, 0,
    8, 0, 0, 0, 6, 0, 0, 0, 3,
    4, 0, 0, 8, 0, 3, 0, 0, 1,
    7, 0, 0, 0, 2, 0, 0, 0, 6,
    0, 6, 0, 0, 0, 0, 2, 8, 0,
    0, 0, 0, 4, 1, 9, 0, 0, 5,
    0, 0, 0, 0, 8, 0, 0, 7, 9
  ];




const styles = {
  innerBoard: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '540px', // Adjust this according to your preference
    height: '540px', // Adjust this according to your preference
    border: 'none'
  },
  cell: {
    width: '60px',
    height: '60px',
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '20px',
    borderCollapse: 'collapse'
  }
};


const getCellBorder = (index) => {
  const row = Math.floor(index / 9);
  const col = index % 9;
  const borderStyle = {
    borderTop: row % 3 === 0 ? '2px solid black' : '.5px solid black',
    borderBottom: row % 3 === 2 ? '2px solid black' : '.5px solid black',
    borderLeft: col % 3 === 0 ? '2px solid black' : '.5px solid black',
    borderRight: col % 3 === 2 ? '2px solid black' : '.5px solid black',
  };
  if (row === 0) borderStyle.borderTop = '3px solid black';
  if (row === 8) borderStyle.borderBottom = '3px solid black';
  if (col === 0) borderStyle.borderLeft = '3px solid black';
  if (col === 8) borderStyle.borderRight = '3px solid black';
  return borderStyle;
};



    return (
      <div
        style={{
          display: 'flex',
          fontSize: 15,
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: 1,
          margin: "25px 0 10px",
          color: "gray",
          justifyContent: "center",
          backgroundColor: "blue",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            width: "100%",
            padding: "10px 20px",
            justifyContent: "center",
            fontFamily: 'Inter, "Material Icons"',
            fontSize: 28,
            backgroundColor: "white",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={styles.innerBoard}>
            {sudokuArray.map((num, index) => (
              <div
                key={index}
                style={{ ...styles.cell, ...getCellBorder(index) }}
              >
                {num !== 0 ? num : ""}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }





