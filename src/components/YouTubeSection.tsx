import { Badge } from "@/components/ui/badge";
import { FadeInUp, StaggerContainer } from "@/components/animations";

export interface VideoEmbed {
  id: string;
  title: string;
  url: string;
  embedId: string;
}

export interface YouTubeSectionProps {
  title?: string;
  videos: VideoEmbed[];
  background?: "default" | "muted";
}

/**
 * YouTubeSection Component
 *
 * Displays YouTube video embeds in a responsive grid.
 * Used on Services and Workshops pages.
 *
 * @example
 * ```tsx
 * <YouTubeSection
 *   title="LEARN MORE"
 *   videos={youtubeVideos}
 * />
 * ```
 */
export function YouTubeSection({
  title = "VIDEOS",
  videos,
  background = "default",
}: YouTubeSectionProps) {
  const sectionClass = background === "muted" ? "bg-section-muted" : "";

  return (
    <section className={`container mx-auto px-4 py-16 ${sectionClass}`}>
      <div className="max-w-6xl mx-auto">
        <StaggerContainer>
          {/* Header */}
          <FadeInUp>
            <div className="text-center space-y-6 mb-12">
              <Badge variant="secondary" className="text-sm">
                {title}
              </Badge>
            </div>
          </FadeInUp>

          {/* Videos Grid */}
          <div className="grid gap-8 md:grid-cols-2">
            {videos.map((video, index) => (
              <FadeInUp key={video.id} delay={0.2 * (index + 1)}>
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-center">
                    {video.title}
                  </h3>
                  <div
                    className="relative w-full"
                    style={{ paddingTop: "56.25%" }}
                  >
                    <iframe
                      className="absolute top-0 left-0 w-full h-full rounded-lg border-2 border-primary-subtle"
                      src={`https://www.youtube.com/embed/${video.embedId}`}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              </FadeInUp>
            ))}
          </div>
        </StaggerContainer>
      </div>
    </section>
  );
}
