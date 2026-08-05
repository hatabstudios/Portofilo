import React from "react";
import { featuresData } from "@/data/features";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { FadeIn, StaggerContainer } from "@/components/animations/MotionWrappers";
import { Dumbbell, Award, Calendar, Flame, Utensils, Key } from "lucide-react";

export const Features: React.FC = () => {
  const getIcon = (name: string) => {
    switch (name) {
      case "Dumbbell":
        return <Dumbbell className="w-7 h-7 text-primary" />;
      case "Award":
        return <Award className="w-7 h-7 text-primary" />;
      case "Calendar":
        return <Calendar className="w-7 h-7 text-primary" />;
      case "Flame":
        return <Flame className="w-7 h-7 text-primary" />;
      case "Utensils":
        return <Utensils className="w-7 h-7 text-primary" />;
      case "Key":
        return <Key className="w-7 h-7 text-primary" />;
      default:
        return <Dumbbell className="w-7 h-7 text-primary" />;
    }
  };

  return (
    <section className="py-20 bg-zinc-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge="WORLD CLASS FACILITIES"
          title="ENGINEERED FOR"
          highlightTitle="PEAK PERFORMANCE"
          description="Every detail of our facility is crafted to eliminate friction between your current state and your ultimate physical potential."
        />

        <StaggerContainer staggerChildren={0.12} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresData.map((item) => (
            <FadeIn key={item.id}>
              <Card className="h-full flex flex-col justify-between group">
                <div>
                  <div className="w-14 h-14 rounded-xl bg-primary-muted border border-primary/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <span className="group-hover:text-white transition-colors">{getIcon(item.icon)}</span>
                  </div>

                  {item.highlight && (
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-primary bg-primary/10 px-2.5 py-1 rounded-full border border-primary/20 mb-3 inline-block">
                      {item.highlight}
                    </span>
                  )}

                  <h3 className="text-xl font-bold uppercase font-heading text-white mb-3 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-sm text-zinc-400 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>
              </Card>
            </FadeIn>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};
