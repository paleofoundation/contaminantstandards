// Persistent researcher identities. Use PersonName for visible name mentions.
export const researchers = {
  karen: {
    name: "Karen Pendergrass",
    orcid: "0000-0002-2348-7259",
  },
  kimberly: {
    name: "Kimberly Eyer",
    orcid: "0000-0001-6194-6148",
  },
  jonathan: {
    name: "Jonathan D. Pendergrass",
    orcid: "0009-0003-5199-0737",
  },
} as const;

export type Researcher = keyof typeof researchers;

export function orcidUrl(person: Researcher) {
  return `https://orcid.org/${researchers[person].orcid}`;
}
