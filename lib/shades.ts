/**
 * The VITA Classical guide, in value order, darkest tab first.
 *
 * These are the tabs a dentist actually holds against your teeth to choose the
 * colour of a crown or a veneer. Using the real guide rather than an invented
 * gradient is the whole point: it is the one object in this practice's world
 * that is already a scale, already graded, and already means something to
 * anyone who has sat in the chair.
 *
 * The order matters and is easy to get wrong. The tabs ship grouped by hue
 * family (A1-A4, B1-B4, C1-C4, D2-D4) but are used arranged by value, which
 * interleaves the families -- D2 sits between A2 and B2, C2 between D4 and C1.
 * That value-ordered run is what "five shades lighter" is counted along, so it
 * is what is stored here. Reversed, this reads B1, A1, B2, D2, A2, C1, C2, D4,
 * A3, D3, B3, A3.5, B4, C3, A4, C4, which is the guide as it comes.
 *
 * Values are approximate sRGB renderings of the tabs, not colour-managed
 * measurements -- close enough to read as enamel, nowhere near close enough to
 * specify a restoration from.
 */

export interface Shade {
  code: string;
  hex: string;
}

export const SHADES: Shade[] = [
  { code: 'C4', hex: '#9C7F4E' },
  { code: 'A4', hex: '#A98A5C' },
  { code: 'C3', hex: '#B0946A' },
  { code: 'B4', hex: '#B79C72' },
  { code: 'A3.5', hex: '#BEA47A' },
  { code: 'B3', hex: '#C5AC85' },
  { code: 'D3', hex: '#CBB48F' },
  { code: 'A3', hex: '#D1BB98' },
  { code: 'D4', hex: '#D5C0A0' },
  { code: 'C2', hex: '#D9C5A8' },
  { code: 'C1', hex: '#DDCAB0' },
  { code: 'A2', hex: '#E1CFB8' },
  { code: 'D2', hex: '#E5D5C1' },
  { code: 'B2', hex: '#E9DBCA' },
  { code: 'A1', hex: '#EEE2D5' },
  { code: 'B1', hex: '#F3EAE0' },
];
