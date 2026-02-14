import React, { useState } from 'react';

const App = () => {
  const [number, setNumber] = useState(null);
  const [history, setHistory] = useState([]);
  const [isRolling, setIsRolling] = useState(false);

  const getTheme = (val) => {
    if (val === null) return { color: 'Black', bg: 'WhiteSmoke', msg: 'Aarambikalaama? Entry kodunga!' };
    if (val > 90) return { color: 'Crimson', bg: 'FloralWhite', msg: 'Ahaa... Inga ratham, anga ratham... Engu paarthalum ratham!' };
    if (val > 75) return { color: 'OrangeRed', bg: 'SeaShell', msg: 'Indha ranam kooda oru vinodhamana santhoshathai tharudhu!' };
    if (val > 60) return { color: 'DarkGoldenRod', bg: 'CornSilk', msg: 'Naanum rowdy dhaan! Naanum rowdy dhaan! Jail-ku poren!' };
    if (val > 45) return { color: 'DarkSlateGray', bg: 'White', msg: 'Varum... Aana varaadhu... Adhu dhaan business-u!' };
    if (val > 30) return { color: 'RoyalBlue', bg: 'AliceBlue', msg: 'Endha oru vishayathaiyum plan pannama panna ippadi dhaan aagum!' };
    if (val > 20) return { color: 'SlateBlue', bg: 'GhostWhite', msg: 'Enna vechu comedy pannalaye? (Is this a joke to you?!)' };
    if (val > 10) return { color: 'MediumPurple', bg: 'Snow', msg: 'Kadupu ethuraar My Lord... Romba kadupu ethuraar!' };
    return { color: 'SteelBlue', bg: 'Azure', msg: 'Ipdiye pannitu irundheenga... Appram naan kilambiduven!' };
  };

  const theme = getTheme(number);

  const generateNumber = () => {
    setIsRolling(true);
    setTimeout(() => {
      const newNumber = Math.floor(Math.random() * 100) + 1;
      setNumber(newNumber);
      setHistory(prev => [newNumber, ...prev].slice(0, 5));
      setIsRolling(false);
    }, 800);
  };

  return (
    <div style={{ ...styles.container, backgroundColor: theme.bg }}>
      <div style={{ ...styles.card, boxShadow: `0px 40px 100px ${theme.color}22` }}>
        <div style={styles.header}>
          <div style={{
            ...styles.indicator,
            backgroundColor: isRolling ? 'Gold' : theme.color
          }} />
          <span style={{ ...styles.statusLabel, color: theme.color }}>
            {isRolling ? 'VADIVELU THINKING...' : 'VAIGAI PUYAL READY'}
          </span>
        </div>

        <h1 style={styles.title}>Random Number Generator</h1>

        <div style={styles.displayArea}>
          {number === null && !isRolling ? (
            <div style={styles.idleText}>Start Pannunga, Kaipulla!</div>
          ) : (
            <div style={{
              ...styles.activeNumber,
              color: isRolling ? 'LightGrey' : theme.color,
              opacity: isRolling ? 0.1 : 1,
              filter: isRolling ? 'blur(10px)' : 'none',
              transform: isRolling ? 'scale(0.5) rotate(10deg)' : 'scale(1) rotate(0deg)'
            }}>
              {number}
            </div>
          )}
        </div>

        <div style={{ ...styles.tamilMessage, color: theme.color }}>
          {isRolling ? 'Script marandhuten... iru varren!' : `"${theme.msg}"`}
        </div>

        <button
          onClick={generateNumber}
          disabled={isRolling}
          style={{
            ...styles.mainButton,
            backgroundColor: isRolling ? 'White' : 'Black',
            color: isRolling ? 'Silver' : 'White',
            borderColor: isRolling ? 'LightGrey' : 'Black'
          }}
        >
          {isRolling ? 'HOLD ON...' : 'GENERATE NUMBER'}
        </button>

        {history.length > 0 && (
          <div style={styles.historySection}>
            <p style={styles.historyHeading}>LAST NUMBERS</p>
            <div style={styles.historyList}>
              {history.map((val, idx) => (
                <div key={idx} style={{
                  ...styles.historyBadge,
                  color: getTheme(val).color,
                  backgroundColor: 'White',
                  border: `1px solid ${getTheme(val).color}44`
                }}>
                  {val}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'all 0.8s ease',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  },
  card: {
    backgroundColor: 'White',
    padding: '50px',
    borderRadius: '50px',
    width: '420px',
    textAlign: 'center',
    transition: 'all 0.8s ease',
    border: '1px solid rgba(0,0,0,0.05)'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    marginBottom: '10px'
  },
  indicator: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    transition: 'all 0.5s ease'
  },
  statusLabel: {
    fontSize: '11px',
    fontWeight: '800',
    letterSpacing: '2px',
  },
  title: {
    fontSize: '24px',
    fontWeight: '900',
    color: 'Black',
    margin: '10px 0 40px 0',
    letterSpacing: '-0.5px'
  },
  displayArea: {
    height: '180px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '20px',
  },
  idleText: {
    color: 'DarkGrey',
    fontSize: '14px',
    fontStyle: 'italic'
  },
  activeNumber: {
    fontSize: '110px',
    fontWeight: '900',
    transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)'
  },
  tamilMessage: {
    fontSize: '15px',
    fontWeight: '700',
    height: '70px',
    marginBottom: '30px',
    transition: 'all 0.5s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontStyle: 'italic',
    padding: '0 20px',
    lineHeight: '1.4'
  },
  mainButton: {
    width: '100%',
    padding: '22px',
    border: '2px solid transparent',
    borderRadius: '25px',
    fontSize: '13px',
    fontWeight: '900',
    letterSpacing: '1px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  historySection: {
    marginTop: '40px',
    paddingTop: '25px',
    borderTop: '1px solid WhiteSmoke'
  },
  historyHeading: {
    fontSize: '10px',
    color: 'Silver',
    letterSpacing: '3px',
    marginBottom: '15px',
    fontWeight: '800'
  },
  historyList: {
    display: 'flex',
    justifyContent: 'center',
    gap: '12px'
  },
  historyBadge: {
    fontSize: '14px',
    fontWeight: '900',
    width: '45px',
    height: '45px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '12px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.02)'
  }
};

export default App;