/*
 * Mock dataset for the lab borrowing demo. One source for every page, so the
 * dashboard cards, tables and reports stay consistent across views.
 * All names, IDs, and equipment rows are sample mock data.
 */
window.LAB_DATA = (function () {
  var TODAY = new Date(2026, 10, 27); // Nov 27, 2026

  function daysAgo(n) {
    var d = new Date(TODAY);
    d.setDate(d.getDate() - n);
    return d;
  }

  function fmt(date) {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  }

  function isoDay(date) {
    return (
      date.getFullYear() +
      "-" +
      String(date.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(date.getDate()).padStart(2, "0")
    );
  }

  var users = [
    { id: "U-0001", name: "SANTOS, MARIA CLARA", shortName: "Maria Santos", idNo: "29380", role: "Student", program: "BSCpE", fullProgram: "BS Computer Engineering", year: "3rd Year", status: "Active" },
    { id: "U-0002", name: "RAMOS, JOSE MIGUEL", shortName: "Jose Ramos", idNo: "31532", role: "Student", program: "BSECE", fullProgram: "BS Electronics Engineering", year: "2nd Year", status: "Active" },
    { id: "U-0003", name: "DELA CRUZ, ANA MAE", shortName: "Ana Dela Cruz", idNo: "30938", role: "Student", program: "BSCpE", fullProgram: "BS Computer Engineering", year: "3rd Year", status: "Active" },
    { id: "U-0004", name: "VILLANUEVA, MARK LESTER", shortName: "Mark Villanueva", idNo: "29000", role: "Student", program: "BSCE", fullProgram: "BS Civil Engineering", year: "4th Year", status: "Active" },
    { id: "U-0005", name: "LIM, GRACE ANN", shortName: "Grace Lim", idNo: "28202", role: "Student", program: "BSCpE", fullProgram: "BS Computer Engineering", year: "1st Year", status: "Active" },
    { id: "U-0006", name: "REYES, CARLO ANTONIO", shortName: "Carlo Reyes", idNo: "30957", role: "Student", program: "BSEE", fullProgram: "BS Electrical Engineering", year: "2nd Year", status: "Active" },
    { id: "U-0007", name: "TORRES, ENGR. DAVID", shortName: "Engr. David Torres", idNo: "FAC-00014", role: "Faculty", program: "BSCpE", fullProgram: "BS Computer Engineering", year: "—", status: "Active" },
    { id: "U-0008", name: "MENDOZA, ELENA JOY", shortName: "Elena Mendoza", idNo: "30187", role: "Student", program: "BSECE", fullProgram: "BS Electronics Engineering", year: "1st Year", status: "Active" },
    { id: "U-0009", name: "NAVARRO, PAOLO CRUZ", shortName: "Paolo Navarro", idNo: "STF-00002", role: "Staff", program: "COE Lab", fullProgram: "College of Engineering", year: "—", status: "Active" },
  ];

  var items = [
    { id: "I-0001", code: "INV-00017-0001", name: "CRIMPING TOOL", unit: "Unit No. 1", category: "Networking", subTag: "Network Tools", status: "Serviceable", qty: 4, availableQty: 3, isKit: false },
    { id: "I-0002", code: "NET-00002-0001", name: "ROUTER TP-LINK (AC1200)", unit: "Unit No. 1", category: "Networking", subTag: "Network Devices", status: "Serviceable", qty: 3, availableQty: 3, isKit: false },
    { id: "I-0003", code: "UNCAT-00259-0002", name: "EXTERNAL DVD PLAYER", unit: "Unit No. 2", category: "Computers", subTag: "Peripherals", status: "—", qty: 2, availableQty: 1, isKit: false },
    { id: "I-0004", code: "INST-00041-0003", name: "DIGITAL MULTIMETER", unit: "Unit No. 3", category: "Instruments", subTag: "Measurement", status: "Serviceable", qty: 6, availableQty: 5, isKit: false },
    { id: "I-0005", code: "PWR-00012-0001", name: "BENCH POWER SUPPLY", unit: "Unit No. 1", category: "Power Supplies", subTag: "DC Supply", status: "Serviceable", qty: 3, availableQty: 3, isKit: false },
    { id: "I-0006", code: "INV-00104-0001", name: "6-COMBINING CIRCUIT", unit: "Unit No. 1", category: "General Inventory", subTag: "General Equipment", status: "Serviceable", qty: 1, availableQty: 1, isKit: false },
    { id: "I-0007", code: "INV-00108-0001", name: "ACER LAPTOP", unit: "Unit No. 1", category: "General Inventory", subTag: "General Equipment", status: "—", qty: 3, availableQty: 3, isKit: false },
    { id: "I-0008", code: "PHYS-00021-0001", name: "ADVANCE PHYSICS & ELECTROSTATIC SET", unit: "Unit No. 1", category: "Physics Apparatus", subTag: "Lab Apparatus", status: "Serviceable", qty: 2, availableQty: 2, isKit: false },
    { id: "I-0009", code: "CONS-00088-0001", name: "JUMPER PINS 10PCS BOX 1", unit: "Box No. 1", category: "Consumables", subTag: "Kit Component", status: "Serviceable", qty: 5, availableQty: 5, isKit: true },
    { id: "I-0010", code: "UNCAT-00238-0001", name: "OSCILLOSCOPE 100MHZ DUAL CH", unit: "Unit No. 1", category: "Uncategorized", subTag: "Pending Review", status: "Serviceable", qty: 4, availableQty: 4, isKit: false },
  ];

  var categories = [
    { id: "CAT-01", code: "CHEM", name: "Chemistry Apparatus", count: 3, layers: 4, description: "Chemistry laboratory glassware and analytical apparatus", color: "#14b8a6" },
    { id: "CAT-02", code: "COMP", name: "Computers", count: 12, layers: 4, description: "Desktops, laptops, optical drives, and related hardware", color: "#ef4444" },
    { id: "CAT-03", code: "CONS", name: "Consumables", count: 4, layers: 2, description: "Cables, jumper wires, connectors, and expendables", color: "#f97316" },
    { id: "CAT-04", code: "INV", name: "General Inventory", count: 1235, layers: 3, description: "Imported from laboratory inventory ledger", color: "#3b82f6" },
    { id: "CAT-05", code: "INST", name: "Instruments", count: 8, layers: 4, description: "Measurement, oscilloscope, and bench test instruments", color: "#8b5cf6" },
    { id: "CAT-06", code: "NET", name: "Networking", count: 32, layers: 4, description: "Routers, switches, crimpers, and network devices", color: "#f59e0b" },
    { id: "CAT-07", code: "PHYS", name: "Physics Apparatus", count: 3, layers: 4, description: "Physics optics, mechanics, and electrostatic apparatus", color: "#6366f1" },
    { id: "CAT-08", code: "PWR", name: "Power Supplies", count: 6, layers: 3, description: "Regulated DC power supply units and UPS", color: "#06b6d4" },
    { id: "CAT-09", code: "UNCAT", name: "Uncategorized", count: 1610, layers: 40, description: "Bulk imported lab apparatus pending sub-classification", color: "#10b981" },
  ];

  var admins = [
    {
      id: "ADM-01",
      name: "Reign Admin",
      joined: "Joined Dec 13, 2025",
      username: "reignadmin",
      email: "reignadmin@coe-lab.local",
      contact: "0900-000-0001",
      role: "Admin",
      status: "Active",
      lastLogin: "Nov 27, 2026 02:58 PM",
    },
  ];

  var activityLogs = [
    {
      id: "LOG-247",
      date: "Nov 27, 2026",
      time: "03:00:59 PM",
      user: "Reign Admin",
      username: "reignadmin",
      action: "Login",
      actionClass: "bg-success",
      module: "—",
      detail: "User logged in successfully",
      ip: "127.0.0.1",
    },
    {
      id: "LOG-246",
      date: "Nov 26, 2026",
      time: "05:58:09 PM",
      user: "Reign Admin",
      username: "reignadmin",
      action: "Login",
      actionClass: "bg-success",
      module: "—",
      detail: "User logged in successfully",
      ip: "127.0.0.1",
    },
    {
      id: "LOG-245",
      date: "Nov 24, 2026",
      time: "03:12:18 PM",
      user: "Reign Admin",
      username: "reignadmin",
      action: "Terminal Sync",
      actionClass: "bg-primary",
      module: "Terminal",
      detail: "Synced ESP32-S3 TERMINAL-01 whitelist (984 users)",
      ip: "192.168.1.42",
    },
    {
      id: "LOG-244",
      date: "Nov 22, 2026",
      time: "09:09:32 PM",
      user: "Reign Admin",
      username: "reignadmin",
      action: "Login",
      actionClass: "bg-success",
      module: "—",
      detail: "User logged in successfully",
      ip: "127.0.0.1",
    },
    {
      id: "LOG-243",
      date: "Nov 20, 2026",
      time: "09:06:33 PM",
      user: "COE Lab Custodian",
      username: "custodian",
      action: "Terminal Lock",
      actionClass: "bg-danger",
      module: "Terminal",
      detail: "Terminal TERMINAL-01 locked by staff scan",
      ip: "127.0.0.1",
    },
  ];

  var kits = [
    {
      id: "K-0001",
      name: "Jumper Pins 10pcs Box 1",
      description: "Bundle of 10 breadboard jumper sets for microcontroller lab activities",
      itemIds: ["I-0009", "I-0004"],
    },
    {
      id: "K-0002",
      name: "Network Cabling Kit",
      description: "Crimping, testing and termination for LAN exercises",
      itemIds: ["I-0001", "I-0002"],
    },
  ];

  // Recent sample transactions (prior days so Today's Borrows/Returns stay 0)
  var transactions = [
    { id: "#358", userId: "U-0001", itemId: "I-0001", borrowed: daysAgo(2), time: "03:20 PM", due: daysAgo(-5), returned: null, returnTime: null, type: "Borrowed", note: "Laboratory exercise" },
    { id: "#357", userId: "U-0007", itemId: "I-0003", borrowed: daysAgo(5), time: "03:19 PM", due: daysAgo(-2), returned: daysAgo(3), returnTime: "03:19 PM", type: "Returned", note: "Media presentation" },
    { id: "#356", userId: "U-0002", itemId: "I-0002", borrowed: daysAgo(7), time: "03:18 PM", due: daysAgo(-1), returned: daysAgo(4), returnTime: "04:05 PM", type: "Borrowed", note: "Network setup demo" },
    { id: "#355", userId: "U-0004", itemId: "I-0004", borrowed: daysAgo(14), time: "03:10 PM", due: daysAgo(7), returned: null, returnTime: null, type: "Borrowed", note: "Bench troubleshooting" },
    { id: "#354", userId: "U-0005", itemId: "I-0005", borrowed: daysAgo(21), time: "10:15 AM", due: daysAgo(14), returned: daysAgo(16), returnTime: "02:40 PM", type: "Returned", note: "Power supply lab" },
  ];

  function user(id) {
    return users.filter(function (u) { return u.id === id; })[0];
  }
  function item(id) {
    return items.filter(function (i) { return i.id === id; })[0];
  }

  function status(t) {
    if (t.returned) return "Returned";
    return t.due.getTime() < TODAY.getTime() ? "Overdue" : "Borrowed";
  }

  function decorate(t) {
    var u = user(t.userId);
    var i = item(t.itemId);
    return {
      id: t.id,
      user: u,
      item: i,
      dueOn: t.due,
      returnedOn: t.returned,
      borrowedISO: isoDay(t.borrowed),
      borrowed: fmt(t.borrowed),
      borrowedTime: t.time,
      due: fmt(t.due),
      returned: t.returned ? fmt(t.returned) : null,
      returnTime: t.returnTime || null,
      type: t.type,
      status: status(t),
      note: t.note,
    };
  }

  var rows = transactions.map(decorate);

  function isOpen(t) { return t.returnedOn === null; }

  function summary() {
    var todayBorrows = rows.filter(function (t) { return t.borrowed === fmt(TODAY); }).length;
    var todayReturns = rows.filter(function (t) { return t.returnedOn !== null && t.returnedOn.getTime() === TODAY.getTime(); }).length;
    return {
      totalItems: 2913,
      availableItems: 2902,
      borrowedItems: 11,
      overdueItems: 11,
      todayBorrows: todayBorrows,
      todayReturns: todayReturns,
      maintenanceItems: 0,
      totalUsers: 982,
      userDirTotal: 984,
      userStudents: 958,
      userFaculty: 24,
      userStaff: 2,
      userActive: 984,
      totalTransactionsCount: 176,
      totalLogsCount: 247,
      totalKits: kits.length,
      totalTransactions: rows.length,
    };
  }

  function byCategory() {
    // Keep chart order matching dashboard screenshot legend:
    // Uncategorized, General Inventory, Networking, Computers, Instruments, Power Supplies, Consumables, Physics Apparatus, Chemistry Apparatus
    var order = [
      "Uncategorized",
      "General Inventory",
      "Networking",
      "Computers",
      "Instruments",
      "Power Supplies",
      "Consumables",
      "Physics Apparatus",
      "Chemistry Apparatus",
    ];
    return order.reduce(function (out, name) {
      var found = categories.filter(function (c) { return c.name === name; })[0];
      if (found) out[found.name] = found.count;
      return out;
    }, {});
  }

  function itemState(id) {
    var open = rows.filter(function (t) { return t.item.id === id && isOpen(t); })[0];
    return open ? { state: open.status, by: open.user.shortName, due: open.due } : { state: "Available" };
  }

  function initial(name) {
    return name.trim().charAt(0).toUpperCase();
  }

  return {
    today: TODAY,
    todayLabel: fmt(TODAY),
    serverTimeLabel: "Nov 27, 2026 03:01:04 PM",
    allUsers: users,
    allItems: items,
    allCategories: categories,
    allAdmins: admins,
    allActivityLogs: activityLogs,
    allKits: kits,
    allTransactions: rows,
    getUser: user,
    getItem: item,
    summary: summary,
    byCategory: byCategory,
    itemState: itemState,
    initial: initial,
    fmt: fmt,
  };
})();
