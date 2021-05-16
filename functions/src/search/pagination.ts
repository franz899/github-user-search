export interface PaginationInfo {
  first: PageInfo | null
  last: PageInfo | null
  next: PageInfo | null
  prev: PageInfo | null
}

interface PageInfo {
  rel: string
  page: number
}

export function getPaginationInfo(linksHeader: string): PaginationInfo {
  const links = linksHeader.split(",");

  return {
    first: getInfoFor(links, "first"),
    last: getInfoFor(links, "last"),
    next: getInfoFor(links, "next"),
    prev: getInfoFor(links, "prev"),
  };
}

function getInfoFor(links: string[], rel: string) {
  const link = links.find(byRel(rel));
  if (link === undefined) {
    return null;
  }
  return createLink(link.split(";")[0].trim(), rel);
}

function byRel(rel: string) {
  return function(x: string) {
    return x.includes(`rel="${rel}"`);
  };
}

function createLink(url: string, rel:string): PageInfo {
  const cleanedURL = url.slice(1, -1)
  return {
    rel,
    page: Number(new URL(cleanedURL).searchParams.get("page"))
  };
}
