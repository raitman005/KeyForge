// Studio-style keyboard illustration drawn as SVG.
// It stands in for product photography, so no external image hosting is needed.
// Negative numbers in a row are blank gaps, positive numbers are key widths in units.

const rep = (width, count) => Array(count).fill(width);

const LAYOUTS = {
  '60': {
    enterRow: 2,
    rows: [
      [...rep(1, 13), 2],
      [1.5, ...rep(1, 12), 1.5],
      [1.75, ...rep(1, 11), 2.25],
      [2.25, ...rep(1, 10), 2.75],
      [...rep(1.25, 3), 6.25, ...rep(1.25, 4)],
    ],
  },
  '75': {
    enterRow: 3,
    rows: [
      rep(1, 16),
      [...rep(1, 13), 2, 1],
      [1.5, ...rep(1, 12), 1.5, 1],
      [1.75, ...rep(1, 11), 2.25, 1],
      [2.25, ...rep(1, 10), 1.75, 1, 1],
      [...rep(1.25, 3), 6.25, ...rep(1, 6)],
    ],
  },
  tkl: {
    enterRow: 3,
    rows: [
      [1, -1, ...rep(1, 4), -0.5, ...rep(1, 4), -0.5, ...rep(1, 4), -0.25, 1, 1, 1],
      [...rep(1, 13), 2, -0.25, 1, 1, 1],
      [1.5, ...rep(1, 12), 1.5, -0.25, 1, 1, 1],
      [1.75, ...rep(1, 11), 2.25, -3.25],
      [2.25, ...rep(1, 10), 2.75, -1.25, 1, -1],
      [...rep(1.25, 3), 6.25, ...rep(1.25, 4), -0.25, 1, 1, 1],
    ],
  },
};

const PALETTES = {
  classic: {
    mat: '#E3D4B4',
    caseTop: '#CDB98F',
    caseEdge: '#A58E62',
    key: '#F4EBD5',
    keySide: '#CDBC94',
    mod: '#8A6446',
    modSide: '#5C4129',
    accent: '#BD7045',
    accentSide: '#8A4C27',
  },
  heritage: {
    mat: '#E8DDC6',
    caseTop: '#8A6A4D',
    caseEdge: '#5E4630',
    key: '#E6D6B5',
    keySide: '#BBA67C',
    mod: '#6B4A33',
    modSide: '#46301F',
    accent: '#C98355',
    accentSide: '#955A35',
  },
  workshop: {
    mat: '#DDD3BF',
    caseTop: '#9A9083',
    caseEdge: '#6E665B',
    key: '#EFE6D2',
    keySide: '#C5B896',
    mod: '#7A6F63',
    modSide: '#52493F',
    accent: '#BD7045',
    accentSide: '#8A4C27',
  },
  artisan: {
    mat: '#E5D8BC',
    caseTop: '#6B4A2F',
    caseEdge: '#42301E',
    key: '#4A3A2D',
    keySide: '#2D2219',
    mod: '#F1E6CC',
    modSide: '#BFAE86',
    accent: '#BD7045',
    accentSide: '#8A4C27',
  },
};

const UNIT = 40;
const KEY_GAP = 4;
const CASE_PAD = 20;
const FOOT = 22;

function buildKeys(rows, enterRow) {
  const keys = [];
  rows.forEach((row, rowIndex) => {
    let cursor = 0;
    row.forEach((size, keyIndex) => {
      if (size < 0) {
        cursor += Math.abs(size);
        return;
      }
      let kind = size === 1 ? 'key' : 'mod';
      if (rowIndex === 0 && keyIndex === 0) kind = 'accent';
      if (rowIndex === enterRow && size === 2.25) kind = 'accent';
      keys.push({ rowIndex, x: cursor, width: size, kind });
      cursor += size;
    });
  });
  return keys;
}

export default function KeyboardArt({ layout = '75', palette = 'classic', className = '' }) {
  const config = LAYOUTS[layout] ?? LAYOUTS['75'];
  const colors = PALETTES[palette] ?? PALETTES.classic;
  const keys = buildKeys(config.rows, config.enterRow);

  const widestRow = Math.max(
    ...config.rows.map((row) => row.reduce((sum, size) => sum + Math.abs(size), 0)),
  );
  const boardWidth = widestRow * UNIT + CASE_PAD * 2;
  const boardHeight = config.rows.length * UNIT + CASE_PAD * 2;
  const viewWidth = boardWidth + 40;
  const viewHeight = boardHeight + FOOT + 50;
  const originX = 20;
  const originY = 20;
  const idPrefix = `kb-${layout}-${palette}`;

  return (
    <svg
      viewBox={`0 0 ${viewWidth} ${viewHeight}`}
      className={className}
      role="img"
      aria-label={`${layout === 'tkl' ? 'TKL' : `${layout}%`} mechanical keyboard with ${palette} keycaps`}
    >
      <defs>
        <linearGradient id={`${idPrefix}-shine`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.35" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <filter id={`${idPrefix}-blur`} x="-20%" y="-50%" width="140%" height="200%">
          <feGaussianBlur stdDeviation="10" />
        </filter>
      </defs>

      {/* soft contact shadow */}
      <ellipse
        cx={viewWidth / 2}
        cy={originY + boardHeight + FOOT + 6}
        rx={boardWidth * 0.46}
        ry="13"
        fill="#34291F"
        opacity="0.28"
        filter={`url(#${idPrefix}-blur)`}
      />

      {/* case thickness */}
      <rect
        x={originX}
        y={originY + FOOT * 0.6}
        width={boardWidth}
        height={boardHeight + FOOT * 0.4}
        rx="24"
        fill={colors.caseEdge}
      />
      {/* case top */}
      <rect
        x={originX}
        y={originY}
        width={boardWidth}
        height={boardHeight}
        rx="24"
        fill={colors.caseTop}
      />
      <rect
        x={originX + 3}
        y={originY + 3}
        width={boardWidth - 6}
        height={boardHeight - 6}
        rx="21"
        fill="none"
        stroke="#fff"
        strokeOpacity="0.25"
        strokeWidth="1.5"
      />
      {/* recessed plate */}
      <rect
        x={originX + 9}
        y={originY + 9}
        width={boardWidth - 18}
        height={boardHeight - 18}
        rx="16"
        fill="#000"
        opacity="0.14"
      />

      {keys.map(({ rowIndex, x, width, kind }) => {
        const palettePair = {
          key: [colors.key, colors.keySide],
          mod: [colors.mod, colors.modSide],
          accent: [colors.accent, colors.accentSide],
        }[kind];
        const keyX = originX + CASE_PAD + x * UNIT + KEY_GAP / 2;
        const keyY = originY + CASE_PAD + rowIndex * UNIT + KEY_GAP / 2;
        const keyWidth = width * UNIT - KEY_GAP;
        const keyHeight = UNIT - KEY_GAP;

        return (
          <g key={`${rowIndex}-${x}`}>
            <rect
              x={keyX}
              y={keyY}
              width={keyWidth}
              height={keyHeight}
              rx="7"
              fill={palettePair[1]}
            />
            <rect
              x={keyX + 3}
              y={keyY + 1.5}
              width={keyWidth - 6}
              height={keyHeight - 7}
              rx="5.5"
              fill={palettePair[0]}
            />
            <rect
              x={keyX + 3}
              y={keyY + 1.5}
              width={keyWidth - 6}
              height={keyHeight - 7}
              rx="5.5"
              fill={`url(#${idPrefix}-shine)`}
            />
          </g>
        );
      })}
    </svg>
  );
}
