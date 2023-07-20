/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      gridRowStart: {
        "8": "8","9": "9","10": "10","11": "11","12": "12","13": "13","14": "14","15": "15","16": "16","17": "17","18": "18","19": "19","20": "20","21": "21","22": "22","23": "23","24": "24","25": "25","26": "26","27": "27","28": "28","29": "29","30": "30","31": "31","32": "32","33": "33","34": "34","35": "35","36": "36","37": "37","38": "38","39": "39","40": "40","41": "41","42": "42","43": "43","44": "44","45": "45","46": "46","47": "47","48": "48","49": "49","50": "50","51": "51","52": "52","53": "53","54": "54","55": "55","56": "56","57": "57","58": "58","59": "59","60": "60","61": "61","62": "62","63": "63","64": "64","65": "65","66": "66","67": "67","68": "68","69": "69","70": "70","71": "71","72": "72","73": "73","74": "74","75": "75","76": "76","77": "77","78": "78","79": "79","80": "80","81": "81","82": "82","83": "83","84": "84","85": "85","86": "86","87": "87","88": "88","89": "89","90": "90","91": "91","92": "92","93": "93","94": "94","95": "95","96": "96","97": "97","98": "98","99": "99","100": "100","101": "101","102": "102","103": "103","104": "104","105": "105","106": "106","107": "107","108": "108","109": "109","110": "110","111": "111","112": "112","113": "113","114": "114","115": "115","116": "116","117": "117","118": "118","119": "119","120": "120","121": "121","122": "122","123": "123","124": "124","125": "125","126": "126","127": "127","128": "128","129": "129","130": "130","131": "131","132": "132","133": "133","134": "134","135": "135","136": "136","137": "137","138": "138","139": "139","140": "140","141": "141","142": "142","143": "143"
      },
      gridRow: {
        "span-8": "span 8 / span 8", "span-9": "span 9 / span 9", "span-10": "span 10 / span 10", "span-11": "span 11 / span 11", "span-12": "span 12 / span 12", "span-13": "span 13 / span 13", "span-14": "span 14 / span 14", "span-15": "span 15 / span 15", "span-16": "span 16 / span 16", "span-17": "span 17 / span 17", "span-18": "span 18 / span 18", "span-19": "span 19 / span 19", "span-20": "span 20 / span 20", "span-21": "span 21 / span 21", "span-22": "span 22 / span 22", "span-23": "span 23 / span 23", "span-24": "span 24 / span 24", "span-25": "span 25 / span 25", "span-26": "span 26 / span 26", "span-27": "span 27 / span 27", "span-28": "span 28 / span 28", "span-29": "span 29 / span 29", "span-30": "span 30 / span 30", "span-31": "span 31 / span 31", "span-32": "span 32 / span 32", "span-33": "span 33 / span 33", "span-34": "span 34 / span 34", "span-35": "span 35 / span 35", "span-36": "span 36 / span 36", "span-37": "span 37 / span 37", "span-38": "span 38 / span 38", "span-39": "span 39 / span 39", "span-40": "span 40 / span 40", "span-41": "span 41 / span 41", "span-42": "span 42 / span 42", "span-43": "span 43 / span 43", "span-44": "span 44 / span 44", "span-45": "span 45 / span 45", "span-46": "span 46 / span 46", "span-47": "span 47 / span 47", "span-48": "span 48 / span 48", "span-49": "span 49 / span 49", "span-50": "span 50 / span 50", "span-51": "span 51 / span 51", "span-52": "span 52 / span 52", "span-53": "span 53 / span 53", "span-54": "span 54 / span 54", "span-55": "span 55 / span 55", "span-56": "span 56 / span 56", "span-57": "span 57 / span 57", "span-58": "span 58 / span 58", "span-59": "span 59 / span 59", "span-60": "span 60 / span 60", "span-61": "span 61 / span 61", "span-62": "span 62 / span 62", "span-63": "span 63 / span 63", "span-64": "span 64 / span 64", "span-65": "span 65 / span 65", "span-66": "span 66 / span 66", "span-67": "span 67 / span 67", "span-68": "span 68 / span 68", "span-69": "span 69 / span 69", "span-70": "span 70 / span 70", "span-71": "span 71 / span 71", "span-72": "span 72 / span 72", "span-73": "span 73 / span 73", "span-74": "span 74 / span 74", "span-75": "span 75 / span 75", "span-76": "span 76 / span 76", "span-77": "span 77 / span 77", "span-78": "span 78 / span 78", "span-79": "span 79 / span 79", "span-80": "span 80 / span 80", "span-81": "span 81 / span 81", "span-82": "span 82 / span 82", "span-83": "span 83 / span 83", "span-84": "span 84 / span 84", "span-85": "span 85 / span 85", "span-86": "span 86 / span 86", "span-87": "span 87 / span 87", "span-88": "span 88 / span 88", "span-89": "span 89 / span 89", "span-90": "span 90 / span 90", "span-91": "span 91 / span 91", "span-92": "span 92 / span 92", "span-93": "span 93 / span 93", "span-94": "span 94 / span 94", "span-95": "span 95 / span 95", "span-96": "span 96 / span 96", "span-97": "span 97 / span 97", "span-98": "span 98 / span 98", "span-99": "span 99 / span 99", "span-100": "span 100 / span 100", "span-101": "span 101 / span 101", "span-102": "span 102 / span 102", "span-103": "span 103 / span 103", "span-104": "span 104 / span 104", "span-105": "span 105 / span 105", "span-106": "span 106 / span 106", "span-107": "span 107 / span 107", "span-108": "span 108 / span 108", "span-109": "span 109 / span 109", "span-110": "span 110 / span 110", "span-111": "span 111 / span 111", "span-112": "span 112 / span 112", "span-113": "span 113 / span 113", "span-114": "span 114 / span 114", "span-115": "span 115 / span 115", "span-116": "span 116 / span 116", "span-117": "span 117 / span 117", "span-118": "span 118 / span 118", "span-119": "span 119 / span 119", "span-120": "span 120 / span 120", "span-121": "span 121 / span 121", "span-122": "span 122 / span 122", "span-123": "span 123 / span 123", "span-124": "span 124 / span 124", "span-125": "span 125 / span 125", "span-126": "span 126 / span 126", "span-127": "span 127 / span 127", "span-128": "span 128 / span 128", "span-129": "span 129 / span 129", "span-130": "span 130 / span 130", "span-131": "span 131 / span 131", "span-132": "span 132 / span 132", "span-133": "span 133 / span 133", "span-134": "span 134 / span 134", "span-135": "span 135 / span 135", "span-136": "span 136 / span 136", "span-137": "span 137 / span 137", "span-138": "span 138 / span 138", "span-139": "span 139 / span 139", "span-140": "span 140 / span 140", "span-141": "span 141 / span 141", "span-142": "span 142 / span 142", "span-143": "span 143 / span 143", "span-144": "span 144 / span 144",
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
}