/**
 * @param {{
 *   publicRepositoryCount: number;
 *   totalStars: number;
 *   totalForks: number;
 * }} snapshot
 */
export function getGithubStatTiles(snapshot) {
  return [
    { label: "Repositories", value: snapshot.publicRepositoryCount },
    { label: "Stars", value: snapshot.totalStars },
    { label: "Forks", value: snapshot.totalForks },
  ];
}
