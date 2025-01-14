export default function BackgroundGrid() {
  {
    /* Grille de fond avec dégradé */
  }
  return (
    <div className="bg-grid-pattern fixed inset-0 -z-10 opacity-100 dark:opacity-80 dark:[background-image:linear-gradient(to_right,#ffffff1a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1a_1px,transparent_1px)]">
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />
    </div>
  );
}
