// color design tokens export
export const colorTokens = {
  grey: {
    300: "#495057",
    400: "#ced4da",
    900: "#000411",
    800: "#001524",
    0: "#edf6f9",
    10: "#edf2f4",
    0: "#fff",
  },
};

export const themeSettings = (mode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            text: {
              main: colorTokens.grey[400],
            },
            background: {
              default: colorTokens.grey[900],
              alt: colorTokens.grey[800],
            },
            // gradient: {
            //   first: "#00a6fb",
            //   second: "#06d6a0",
            // },
            gradient: {
              first: "#480ca8",
              second: "#b5179e",
              alt: "#00a6fb",
            },
          }
        : {
            text: {
              main: colorTokens.grey[300],
            },
            background: {
              default: colorTokens.grey[10],
              alt: colorTokens.grey[0],
            },
            gradient: {
              first: "#00a6fb",
              second: "#06d6a0",
              alt: "#00a6fb",
            },
          }),
    },
    typography: {
      fontFamily: ["Rubik", "sans-serif"].join(","),
      fontSize: 14,
      h1: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};
