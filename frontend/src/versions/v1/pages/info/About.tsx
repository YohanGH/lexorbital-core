/**
 * About page component
 *
 * Displays information about LexOrbital, its mission, vision, and team.
 */

import type { JSX } from "react"
import { useTranslation } from "react-i18next"

import { Container } from "@/versions/v1/components/atoms/layout/container/Container"
import { Section } from "@/versions/v1/components/atoms/layout/section/Section"
import { Title } from "@/versions/v1/components/atoms/typography/title/Title"
import { Paragraph } from "@/versions/v1/components/atoms/typography/paragraph/Paragraph"
import { Blockquote } from "@/versions/v1/components/atoms/typography/blockquote/Blockquote"
import { List } from "@/versions/v1/components/atoms/typography/list/List"

// Constants for translation keys
const GOAL_KEYS = [
  "structuralClarity",
  "modularTransparency",
  "versionAwareness",
  "documentationIntegration",
] as const

const PLANNED_ENHANCEMENT_KEYS = [
  "dynamicVisualization",
  "comparisonTools",
  "dependencyMapping",
  "documentationSystem",
] as const

const VISUAL_EVOLUTION_KEYS = [
  "colorSystem",
  "iconography",
  "visualLanguage",
  "typography",
] as const

export function About(): JSX.Element {
  const { t } = useTranslation("info")

  return (
    <Container size="lg" padding="lg" id="about-page">
      <Title level={1} margin="xl" align="center" id="main-heading">
        {t("about.title")}
      </Title>

      <Section id="what-is" title={t("about.whatIs.title")} spacing="lg">
        <Paragraph size="lg" margin="lg">
          {t("about.whatIs.paragraph1")}
        </Paragraph>
        <Paragraph size="lg" margin="lg">
          {t("about.whatIs.paragraph2")}
        </Paragraph>
        <Paragraph size="lg" margin="none">
          {t("about.whatIs.paragraph3")}
        </Paragraph>
      </Section>

      <Section
        id="goals"
        title={t("about.goals.title")}
        spacing="lg"
        background="light"
      >
        <Blockquote side="left" accentColor="primary" size="lg">
          {t("about.goals.structuralClarity.description")}
        </Blockquote>

        <div className="mt-8 space-y-6">
          {GOAL_KEYS.map(goalKey => (
            <div key={goalKey} className="border-primary-500 border-l-4 pl-6">
              <Title level={4} margin="sm">
                {t(`about.goals.${goalKey}.title`)}
              </Title>
              <Paragraph color="muted">
                {t(`about.goals.${goalKey}.description`)}
              </Paragraph>
            </div>
          ))}
        </div>
      </Section>

      <Section
        id="future-versions"
        title={t("about.futureVersions.title")}
        spacing="lg"
      >
        <div className="rounded-lg border-2 border-dashed border-gray-300 p-8">
          <Title level={3} margin="md" align="center" color="muted">
            {t("about.futureVersions.subtitle")}
          </Title>

          <Paragraph align="center" margin="lg" color="muted">
            {t("about.futureVersions.description")}
          </Paragraph>

          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <Title level={4} margin="md">
                {t("about.futureVersions.plannedEnhancements.title")}
              </Title>
              <List type="unordered" spacing="tight">
                {PLANNED_ENHANCEMENT_KEYS.map(itemKey => (
                  <List.Item key={itemKey} icon="•">
                    {t(
                      `about.futureVersions.plannedEnhancements.items.${itemKey}`
                    )}
                  </List.Item>
                ))}
              </List>
            </div>

            <div>
              <Title level={4} margin="md">
                {t("about.futureVersions.visualEvolution.title")}
              </Title>
              <List type="unordered" spacing="tight">
                {VISUAL_EVOLUTION_KEYS.map(itemKey => (
                  <List.Item key={itemKey} icon="•">
                    {t(`about.futureVersions.visualEvolution.items.${itemKey}`)}
                  </List.Item>
                ))}
              </List>
            </div>
          </div>
        </div>
      </Section>
    </Container>
  )
}
