import NumberTicker from "@/components/ui/number-ticker";

export default function Stats() {
  return (
    <section className="relative w-full border-y bg-primary/[0.02] py-20">
      <div className="container">
        <div className="grid gap-8 text-center md:grid-cols-4">
          <div className="space-y-2">
            <h3 className="text-4xl font-bold text-primary">
              <NumberTicker value={100000} />+
            </h3>
            <p className="text-muted-foreground">Pages créées</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-4xl font-bold text-primary">
              <NumberTicker value={95} />%
            </h3>
            <p className="text-muted-foreground">Taux de satisfaction</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-4xl font-bold text-primary">
              <NumberTicker value={24} />
              /
              <NumberTicker value={7} />
            </h3>
            <p className="text-muted-foreground">Support client</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-4xl font-bold text-primary">
              <NumberTicker value={50} />+
            </h3>
            <p className="text-muted-foreground">Templates disponibles</p>
          </div>
        </div>
      </div>
    </section>
  );
}
