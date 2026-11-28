/*
 * Mock dataset and shared demo state for Classroom Manager (Desktop + Mobile).
 * Uses student initials only and synthetic sample IDs for privacy.
 */
window.CLASSROOM_DEMO = (function () {
  var STORAGE_KEY = "classroom-demo-state";

  var subjects = [
    {
      id: "PROG11",
      name: "Programming",
      grade: "Grade 11",
      strand: "STEM",
      section: "STEM A",
      room: "Room 204",
      enrolled: 32,
      rate: 84,
      schedule: "Mon/Wed/Fri · 1:00–2:00 PM",
      initialsPreview: ["J.C.", "G.G.", "L.R.", "M.D.", "E.C."],
    },
    {
      id: "ORAL11",
      name: "Oral Communication",
      grade: "Grade 11",
      strand: "STEM",
      section: "Aristotle",
      room: "Room 108",
      enrolled: 32,
      rate: 88,
      schedule: "Wed/Fri · 11:00–12:00 PM",
      initialsPreview: ["R.A.", "J.A.", "A.R.", "J.D.", "K.F."],
    },
    {
      id: "PHYS11",
      name: "Physics",
      grade: "Grade 11",
      strand: "STEM",
      section: "STEM A",
      room: "Room 210",
      enrolled: 32,
      rate: 84,
      schedule: "Mon/Wed/Fri · 8:00–9:00 AM",
      initialsPreview: ["D.M.", "M.T.", "J.V.", "A.S.", "R.J."],
    },
    {
      id: "STAT12",
      name: "Statistics & Probability",
      grade: "Grade 12",
      strand: "STEM",
      section: "STEM B",
      room: "Room 212",
      enrolled: 30,
      rate: 84,
      schedule: "Tue/Thu · 9:30–11:00 AM",
      initialsPreview: ["S.L.", "J.B.", "M.C.", "R.D.", "A.E."],
    },
    {
      id: "PRAC12",
      name: "Practical Research 2",
      grade: "Grade 12",
      strand: "STEM",
      section: "STEM B",
      room: "Room 214",
      enrolled: 30,
      rate: 85,
      schedule: "Tue/Thu · 1:30–3:00 PM",
      initialsPreview: ["K.G.", "T.H.", "N.L.", "P.M.", "V.R."],
    },
  ];

  var students = [
    { id: "ID-1101", initials: "R. A.", registerInitials: "A., R.", sex: "M", grade: "Grade 11", section: "Aristotle", rate: 100, color: "#1b6543", bg: "#e8f5ee" },
    { id: "ID-1102", initials: "J. A.", registerInitials: "A., J.", sex: "M", grade: "Grade 11", section: "Aristotle", rate: 100, color: "#b45309", bg: "#fef3c7" },
    { id: "ID-1103", initials: "A. R.", registerInitials: "R., A.", sex: "M", grade: "Grade 11", section: "Aristotle", rate: 100, color: "#0369a1", bg: "#e0f2fe" },
    { id: "ID-1104", initials: "J. D.", registerInitials: "D., J.", sex: "M", grade: "Grade 11", section: "Aristotle", rate: 100, color: "#7c2d12", bg: "#ffedd5" },
    { id: "ID-1105", initials: "J. F.", registerInitials: "F., J.", sex: "F", grade: "Grade 11", section: "Aristotle", rate: 100, color: "#4338ca", bg: "#e0e7ff" },
    { id: "ID-1106", initials: "K. F.", registerInitials: "F., K.", sex: "M", grade: "Grade 11", section: "Aristotle", rate: 100, color: "#0f766e", bg: "#ccfbf1" },
    { id: "ID-1107", initials: "D. M.", registerInitials: "M., D.", sex: "M", grade: "Grade 11", section: "Aristotle", rate: 100, color: "#be185d", bg: "#fce7f3" },
    { id: "ID-1108", initials: "M. T.", registerInitials: "T., M.", sex: "M", grade: "Grade 11", section: "Aristotle", rate: 100, color: "#1d4ed8", bg: "#dbeafe" },
    { id: "ID-1109", initials: "J. V.", registerInitials: "V., J.", sex: "M", grade: "Grade 11", section: "Aristotle", rate: 100, color: "#4d7c0f", bg: "#ecfccb" },
    { id: "ID-1110", initials: "A. S.", registerInitials: "S., A.", sex: "F", grade: "Grade 11", section: "Aristotle", rate: 100, color: "#9333ea", bg: "#f3e8ff" },
    { id: "ID-1111", initials: "R. J.", registerInitials: "J., R.", sex: "F", grade: "Grade 11", section: "Aristotle", rate: 100, color: "#0e7490", bg: "#cffafe" },
    { id: "ID-1112", initials: "S. L.", registerInitials: "L., S.", sex: "F", grade: "Grade 11", section: "Aristotle", rate: 100, color: "#047857", bg: "#d1fae5" },
  ];

  var defaultState = {
    pendingChanges: 1,
    activeSubjectId: "PROG11",
    scans: [], // { id, initials, registerInitials, sex, timeIn, timeOut, status }
  };

  function loadState() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        var parsed = JSON.parse(raw);
        if (parsed && Array.isArray(parsed.scans)) return parsed;
      }
    } catch (e) {}
    return JSON.parse(JSON.stringify(defaultState));
  }

  function saveState(state) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {}
  }

  function scanNextStudent(subjectId, forceId) {
    var state = loadState();
    var targetSubject = subjectId || state.activeSubjectId || "PROG11";
    var scannedIds = state.scans.map(function (s) { return s.id; });
    var candidate = null;
    if (forceId) {
      candidate = students.filter(function (st) {
        return st.id.toLowerCase() === forceId.toLowerCase() || st.initials.toLowerCase() === forceId.toLowerCase();
      })[0];
    }
    if (!candidate) {
      candidate = students.filter(function (st) { return scannedIds.indexOf(st.id) === -1; })[0];
    }
    if (!candidate) return { state: state, scanned: null, done: true };
    if (scannedIds.indexOf(candidate.id) !== -1) {
      return { state: state, scanned: candidate, duplicate: true };
    }

    var isLate = state.scans.length > 0 && state.scans.length % 4 === 3;
    var entry = {
      id: candidate.id,
      initials: candidate.initials,
      registerInitials: candidate.registerInitials,
      sex: candidate.sex,
      subjectId: targetSubject,
      timeIn: isLate ? "08:12" : "08:00",
      timeOut: "09:00",
      status: isLate ? "Late" : "Present",
    };
    state.scans.unshift(entry);
    state.pendingChanges += 1;
    state.activeSubjectId = targetSubject;
    saveState(state);
    return { state: state, scanned: entry, done: false };
  }

  function clearPending() {
    var state = loadState();
    state.pendingChanges = 0;
    saveState(state);
    return state;
  }

  function resetAll() {
    var fresh = JSON.parse(JSON.stringify(defaultState));
    saveState(fresh);
    return fresh;
  }

  return {
    teacher: "Reign Marc Cipriano",
    school: "Tacurong National High School",
    dateLabel: "Friday, November 27, 2026",
    subjects: subjects,
    students: students,
    loadState: loadState,
    saveState: saveState,
    scanNextStudent: scanNextStudent,
    clearPending: clearPending,
    resetAll: resetAll,
  };
})();
