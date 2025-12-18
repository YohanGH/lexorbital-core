import type { Meta, StoryObj } from "@storybook/react"

import { List } from "./List"
import { Title } from "../title/Title"
import { Paragraph } from "../paragraph/Paragraph"

const meta: Meta<typeof List> = {
  title: "Atoms/Typography/List",
  component: List,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["unordered", "ordered", "description"],
    },
    variant: {
      control: "select",
      options: ["default", "bullet", "check", "xmark", "arrow"],
    },
    spacing: {
      control: "select",
      options: ["none", "tight", "normal", "loose"],
    },
    iconColor: {
      control: "select",
      options: [
        "default",
        "primary",
        "secondary",
        "success",
        "warning",
        "error",
      ],
    },
  },
}

export default meta
type Story = StoryObj<typeof List>

export const Default: Story = {
  args: {
    children: [
      <List.Item key="1">Premier élément de la liste</List.Item>,
      <List.Item key="2">
        Deuxième élément avec un texte plus long pour démontrer le comportement
        de retour à la ligne
      </List.Item>,
      <List.Item key="3">Troisième élément</List.Item>,
    ],
  },
}

export const Ordered: Story = {
  args: {
    type: "ordered",
    children: [
      <List.Item key="1">Première étape</List.Item>,
      <List.Item key="2">Deuxième étape</List.Item>,
      <List.Item key="3">Troisième étape</List.Item>,
    ],
  },
}

export const WithCheckIcons: Story = {
  args: {
    variant: "check",
    iconColor: "success",
    children: [
      <List.Item key="1">Fonctionnalité incluse</List.Item>,
      <List.Item key="2">Support 24/7</List.Item>,
      <List.Item key="3">Mises à jour gratuites</List.Item>,
    ],
  },
}

export const DescriptionList: Story = {
  args: {
    type: "description",
    variant: "arrow",
    iconColor: "primary",
    children: [
      <List.Item key="1" value="Nom" description="Jean Dupont">
        Nom
      </List.Item>,
      <List.Item key="2" value="Email" description="jean@exemple.com">
        Email
      </List.Item>,
      <List.Item key="3" value="Téléphone" description="+33 1 23 45 67 89">
        Téléphone
      </List.Item>,
    ],
  },
}

export const NestedLists: Story = {
  render: () => (
    <div className="space-y-6">
      <Title level={3}>Liste hiérarchique</Title>
      <Paragraph>
        Exemple de liste avec plusieurs niveaux d'imbrication :
      </Paragraph>

      <List variant="bullet">
        <List.Item>
          Développement Frontend
          <List.Nested variant="check">
            <List.Item>React avec TypeScript</List.Item>
            <List.Item>
              Tests
              <List.Nested variant="arrow">
                <List.Item>Jest</List.Item>
                <List.Item>Testing Library</List.Item>
              </List.Nested>
            </List.Item>
            <List.Item>Storybook pour la documentation</List.Item>
          </List.Nested>
        </List.Item>
        <List.Item>
          Développement Backend
          <List.Nested variant="check">
            <List.Item>Node.js</List.Item>
            <List.Item>Base de données PostgreSQL</List.Item>
          </List.Nested>
        </List.Item>
      </List>
    </div>
  ),
}

export const InteractiveItems: Story = {
  render: () => (
    <List>
      <List.Item interactive onClick={() => alert("Navigation vers Accueil")}>
        Accueil
      </List.Item>
      <List.Item interactive onClick={() => alert("Navigation vers À propos")}>
        À propos
      </List.Item>
      <List.Item interactive onClick={() => alert("Navigation vers Contact")}>
        Contact
      </List.Item>
    </List>
  ),
}
