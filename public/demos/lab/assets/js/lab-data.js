/*
 * Mock dataset for the lab borrowing demo. One source for every page, so the
 * dashboard cards, tables and reports cannot disagree with each other.
 * Names and equipment are sample data, not the client's records.
 */
window.LAB_DATA = (function () {
  var TODAY = new Date(2026, 5, 22); // Jun 22, 2026

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

  // yyyy-mm-dd, matching the day keys the dashboard's trend chart builds
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
    { id: "U-0001", name: "Maria Santos", program: "BS Computer Engineering", idNo: "COE-2022-0114", status: "Active" },
    { id: "U-0002", name: "Jose Ramos", program: "BS Electronics Engineering", idNo: "COE-2021-0387", status: "Active" },
    { id: "U-0003", name: "Ana Dela Cruz", program: "BS Computer Engineering", idNo: "COE-2023-0201", status: "Active" },
    { id: "U-0004", name: "Mark Villanueva", program: "BS Electrical Engineering", idNo: "COE-2022-0442", status: "Active" },
    { id: "U-0005", name: "Grace Lim", program: "BS Computer Engineering", idNo: "COE-2023-0519", status: "Active" },
  ];

  var items = [
    { id: "I-0001", code: "NET-0001", name: "Crimping tool", unit: "Unit No. 1", category: "Tools" },
    { id: "I-0002", code: "NET-0002", name: "Router TP-Link (AC1200)", unit: "Unit No. 1", category: "Networking" },
    { id: "I-0003", code: "AV-0001", name: "External DVD Player", unit: "Unit No. 2", category: "Computers" },
    { id: "I-0004", code: "EL-0001", name: "Digital multimeter", unit: "Unit No. 3", category: "Instruments" },
    { id: "I-0005", code: "EL-0002", name: "Bench power supply", unit: "Unit No. 1", category: "Power Supplies" },
  ];

  var kits = [
    {
      id: "K-0001",
      name: "Network Cabling Kit",
      description: "Crimping, testing and termination for LAN exercises",
      itemIds: ["I-0001", "I-0002"],
    },
  ];

  // due in the past for one open loan, so the Overdue card is not a guess
  var transactions = [
    { id: "T-0005", userId: "U-0001", itemId: "I-0001", borrowed: daysAgo(0), due: daysAgo(-7), returned: null, note: "Laboratory exercise" },
    { id: "T-0004", userId: "U-0002", itemId: "I-0002", borrowed: daysAgo(1), due: daysAgo(-6), returned: daysAgo(0), note: "Network setup demo" },
    { id: "T-0003", userId: "U-0003", itemId: "I-0003", borrowed: daysAgo(2), due: daysAgo(-3), returned: null, note: "Media presentation" },
    { id: "T-0002", userId: "U-0004", itemId: "I-0004", borrowed: daysAgo(9), due: daysAgo(2), returned: null, note: "Bench troubleshooting" },
    { id: "T-0001", userId: "U-0005", itemId: "I-0005", borrowed: daysAgo(14), due: daysAgo(7), returned: daysAgo(10), note: "Power supply lab" },
  ];

  function user(id) {
    return users.filter(function (u) { return u.id === id; })[0];
  }
  function item(id) {
    return items.filter(function (i) { return i.id === id; })[0];
  }

  function status(t) {
    if (t.returned) return "Returned";
    // midnight-normalized compare, so a same-day due date is not overdue
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
      due: fmt(t.due),
      returned: t.returned ? fmt(t.returned) : null,
      status: status(t),
      note: t.note,
    };
  }

  var rows = transactions.map(decorate);

  function isOpen(t) { return t.returnedOn === null; }

  function summary() {
    var borrowed = rows.filter(function (t) { return t.status === "Borrowed"; }).length;
    var overdue = rows.filter(function (t) { return t.status === "Overdue"; }).length;
    var todayBorrows = rows.filter(function (t) { return t.borrowed === fmt(TODAY); }).length;
    var todayReturns = rows.filter(function (t) { return t.returnedOn !== null && t.returnedOn.getTime() === TODAY.getTime(); }).length;
    return {
      totalItems: items.length,
      availableItems: items.length - rows.filter(isOpen).length,
      borrowedItems: borrowed,
      overdueItems: overdue,
      todayBorrows: todayBorrows,
      todayReturns: todayReturns,
      totalUsers: users.length,
      totalKits: kits.length,
      totalTransactions: rows.length,
    };
  }

  function byCategory() {
    return items.reduce(function (out, i) {
      out[i.category] = (out[i.category] || 0) + 1;
      return out;
    }, {});
  }

  function itemState(id) {
    var open = rows.filter(function (t) { return t.item.id === id && isOpen(t); })[0];
    return open ? { state: open.status, by: open.user.name, due: open.due } : { state: "Available" };
  }

  function initial(name) {
    return name.trim().charAt(0).toUpperCase();
  }

  return {
    today: TODAY,
    todayLabel: fmt(TODAY),
    allUsers: users,
    allItems: items,
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
