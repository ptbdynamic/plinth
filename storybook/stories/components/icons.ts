/**
 * Sample icons for the stories: simple shapes drawn for Plinth, not taken from an icon set.
 * Projects bring their own icons.
 */
const outline = (paths: string) =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`;

export const sampleIcons = {
  check: outline('<path d="M5 12l5 5L19 7"/>'),
  alert: outline('<circle cx="12" cy="12" r="9"/><path d="M12 7v6M12 16.5v.01"/>'),
  arrow: outline('<path d="M5 12h14M13 6l6 6-6 6"/>'),
  back: outline('<path d="M19 12H5M11 6l-6 6 6 6"/>'),
  menu: outline('<path d="M4 7h16M4 12h16M4 17h16"/>'),
  search: outline('<circle cx="11" cy="11" r="6.5"/><path d="M16 16l4 4"/>'),
  close: outline('<path d="M6 6l12 12M18 6L6 18"/>'),
  more: outline(
    '<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',
  ),
  bell: outline(
    '<path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15z"/><path d="M10 20.5a2 2 0 0 0 4 0"/>',
  ),
  globe: outline(
    '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18"/>',
  ),
  user: outline('<circle cx="12" cy="8" r="4"/><path d="M4 20a8 8 0 0 1 16 0"/>'),
  copy: outline(
    '<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3"/>',
  ),
  select: outline('<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M8 12l3 3 5-6"/>'),
  filter: outline('<path d="M4 6h16M7 12h10M10 18h4"/>'),
  sort: outline('<path d="M7 4v16M3 16l4 4 4-4M17 20V4M13 8l4-4 4 4"/>'),
  archive: outline(
    '<rect x="3" y="4" width="18" height="4" rx="1"/><path d="M5 8v11h14V8M10 12h4"/>',
  ),
  inbox: outline('<path d="M4 13l2.5-8h11L20 13v6H4z"/><path d="M4 13h4.5a3.5 3.5 0 0 0 7 0H20"/>'),
  trash: outline('<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>'),
  file: outline('<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>'),
  image: outline(
    '<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="10" r="1.5"/><path d="M21 16l-5-5-8 8"/>',
  ),
  support: outline(
    '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><path d="M5.6 5.6l3.6 3.6M14.8 14.8l3.6 3.6M18.4 5.6l-3.6 3.6M9.2 14.8l-3.6 3.6"/>',
  ),
  settings: outline(
    '<path d="M4 7h10M18 7h2M4 17h4M12 17h8"/><circle cx="16" cy="7" r="2"/><circle cx="10" cy="17" r="2"/>',
  ),
  help: outline(
    '<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.3-1 .9-1 1.7M12 17v.01"/>',
  ),
  /** A made-up app's logo mark: a harbour's waves in a rounded square. */
  mark: outline(
    '<rect x="3" y="3" width="18" height="18" rx="5"/><path d="M7 11c1.7 0 1.7-1.5 3.3-1.5s1.7 1.5 3.4 1.5 1.6-1.5 3.3-1.5M7 15c1.7 0 1.7-1.5 3.3-1.5s1.7 1.5 3.4 1.5 1.6-1.5 3.3-1.5"/>',
  ),
  star: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/></svg>',
};
