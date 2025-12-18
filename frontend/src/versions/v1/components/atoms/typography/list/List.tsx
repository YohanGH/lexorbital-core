import type { ReactNode } from "react"
import { forwardRef, createContext, useContext } from "react"

import { mergeClasses } from "@/core/lib/utils"

export type ListType = "unordered" | "ordered" | "description"
export type ListVariant = "default" | "bullet" | "check" | "xmark" | "arrow"
export type ListSpacing = "none" | "tight" | "normal" | "loose"
export type ListIconPosition = "left" | "right"

interface ListContextValue {
  type: ListType
  variant: ListVariant
  spacing: ListSpacing
  iconPosition: ListIconPosition
  iconColor: string
  showIcons: boolean
}

const ListContext = createContext<ListContextValue>({
  type: "unordered",
  variant: "default",
  spacing: "normal",
  iconPosition: "left",
  iconColor: "text-current",
  showIcons: false,
})

export interface ListProps {
  /** Type de liste */
  type?: ListType
  /** Variante visuelle */
  variant?: ListVariant
  /** Espacement entre les items */
  spacing?: ListSpacing
  /** Position des icônes */
  iconPosition?: ListIconPosition
  /** Couleur des icônes */
  iconColor?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "error"
  /** Items de la liste (alternative à l'utilisation de List.Item) */
  items?: ReactNode[]
  /** ID pour l'accessibilité */
  id?: string
  /** Label ARIA pour la liste */
  ariaLabel?: string
  /** Rôle ARIA personnalisé */
  role?: string
  /** Classes CSS supplémentaires */
  className?: string
  /** Enfants (peut contenir des List.Item) */
  children?: ReactNode
  /** Niveau d'imbrication pour les sous-listes */
  nestedLevel?: number
  /** Afficher les icônes */
  showIcons?: boolean
}

const spacingStyles: Record<ListSpacing, string> = {
  none: "space-y-0",
  tight: "space-y-1",
  normal: "space-y-2",
  loose: "space-y-4",
}

const iconColorStyles = {
  default: "text-current",
  primary: "text-primary-600",
  secondary: "text-secondary-600",
  success: "text-success-600",
  warning: "text-warning-600",
  error: "text-error-600",
}

const getIconForVariant = (variant: ListVariant) => {
  switch (variant) {
    case "check":
      return (
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      )
    case "xmark":
      return (
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      )
    case "arrow":
      return (
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      )
    case "bullet":
    default:
      return (
        <svg className="h-2 w-2" fill="currentColor" viewBox="0 0 8 8">
          <circle cx="4" cy="4" r="4" />
        </svg>
      )
  }
}

const ListBase = forwardRef<
  HTMLUListElement | HTMLOListElement | HTMLDListElement,
  ListProps
>(
  (
    {
      type = "unordered",
      variant = "default",
      spacing = "normal",
      iconPosition = "left",
      iconColor = "default",
      items,
      id,
      ariaLabel,
      role,
      className = "",
      children,
      nestedLevel = 0,
      showIcons = variant !== "default",
    },
    ref
  ) => {
    const contextValue: ListContextValue = {
      type,
      variant,
      spacing,
      iconPosition,
      iconColor: iconColorStyles[iconColor],
      showIcons,
    }

    const paddingLeftMap: Record<number, string> = {
      1: "pl-4",
      2: "pl-8",
      3: "pl-12",
    }
    const paddingLeft =
      nestedLevel > 0 ? paddingLeftMap[Math.min(nestedLevel, 3)] || "pl-12" : ""

    // Rendu pour les listes de description
    if (type === "description") {
      return (
        <ListContext.Provider value={contextValue}>
          <dl
            ref={ref as React.Ref<HTMLDListElement>}
            id={id}
            className={mergeClasses(
              "description-list",
              spacingStyles[spacing],
              paddingLeft,
              className
            )}
            aria-label={ariaLabel}
            role={role}
          >
            {items
              ? items.map((item, index) => (
                  <div key={index} className="flex items-start">
                    {showIcons && iconPosition === "left" && (
                      <span
                        className={mergeClasses(
                          "mt-1 mr-2 shrink-0",
                          iconColorStyles[iconColor]
                        )}
                        aria-hidden="true"
                      >
                        {getIconForVariant(variant)}
                      </span>
                    )}
                    {item}
                    {showIcons && iconPosition === "right" && (
                      <span
                        className={mergeClasses(
                          "mt-1 ml-2 shrink-0",
                          iconColorStyles[iconColor]
                        )}
                        aria-hidden="true"
                      >
                        {getIconForVariant(variant)}
                      </span>
                    )}
                  </div>
                ))
              : children}
          </dl>
        </ListContext.Provider>
      )
    }

    // Rendu pour les listes ordonnées et non ordonnées
    if (type === "ordered") {
      return (
        <ListContext.Provider value={contextValue}>
          <ol
            ref={ref as React.Ref<HTMLOListElement>}
            id={id}
            className={mergeClasses(
              "list-decimal",
              spacingStyles[spacing],
              paddingLeft,
              className
            )}
            aria-label={ariaLabel}
            role={role}
            start={nestedLevel === 0 ? 1 : undefined}
          >
            {items
              ? items.map((item, index) => (
                  <li key={index} className="flex items-start">
                    {showIcons && iconPosition === "left" && (
                      <span
                        className={mergeClasses(
                          "mt-1 mr-2 shrink-0",
                          iconColorStyles[iconColor]
                        )}
                        aria-hidden="true"
                      >
                        {getIconForVariant(variant)}
                      </span>
                    )}
                    {item}
                    {showIcons && iconPosition === "right" && (
                      <span
                        className={mergeClasses(
                          "mt-1 ml-2 shrink-0",
                          iconColorStyles[iconColor]
                        )}
                        aria-hidden="true"
                      >
                        {getIconForVariant(variant)}
                      </span>
                    )}
                  </li>
                ))
              : children}
          </ol>
        </ListContext.Provider>
      )
    }

    return (
      <ListContext.Provider value={contextValue}>
        <ul
          ref={ref as React.Ref<HTMLUListElement>}
          id={id}
          className={mergeClasses(
            "list-none",
            spacingStyles[spacing],
            paddingLeft,
            className
          )}
          aria-label={ariaLabel}
          role={role}
        >
          {items
            ? items.map((item, index) => (
                <li key={index} className="flex items-start">
                  {showIcons && iconPosition === "left" && (
                    <span
                      className={mergeClasses(
                        "mt-1 mr-2 shrink-0",
                        iconColorStyles[iconColor]
                      )}
                      aria-hidden="true"
                    >
                      {getIconForVariant(variant)}
                    </span>
                  )}
                  {item}
                  {showIcons && iconPosition === "right" && (
                    <span
                      className={mergeClasses(
                        "mt-1 ml-2 shrink-0",
                        iconColorStyles[iconColor]
                      )}
                      aria-hidden="true"
                    >
                      {getIconForVariant(variant)}
                    </span>
                  )}
                </li>
              ))
            : children}
        </ul>
      </ListContext.Provider>
    )
  }
)

ListBase.displayName = "List"

// Type étendu pour inclure les sous-composants
export interface ListComponent
  extends React.ForwardRefExoticComponent<
    ListProps &
      React.RefAttributes<
        HTMLUListElement | HTMLOListElement | HTMLDListElement
      >
  > {
  Item: typeof ListItem
  Nested: typeof NestedList
}

// List sera créé après la déclaration de ListItem et NestedList

// Sous-composant List.Item
export interface ListItemProps {
  /** Contenu de l'item */
  children: ReactNode
  /** Icône personnalisée (remplace l'icône par défaut) */
  icon?: ReactNode
  /** Description (pour les listes de description) */
  description?: ReactNode
  /** Valeur (pour les listes de description) */
  value?: ReactNode
  /** Classes CSS supplémentaires */
  className?: string
  /** ID pour l'accessibilité */
  id?: string
  /** Item interactif */
  interactive?: boolean
  /** Fonction de clic */
  onClick?: () => void
  /** Rôle ARIA */
  role?: string
}

export const ListItem = forwardRef<
  HTMLLIElement | HTMLDivElement,
  ListItemProps
>(
  (
    {
      children,
      icon,
      description,
      value,
      className = "",
      id,
      interactive = false,
      onClick,
      role,
    },
    ref
  ) => {
    const context = useContext(ListContext)
    const { type, variant, iconPosition, iconColor, showIcons } = context

    const iconContent = icon || (showIcons ? getIconForVariant(variant) : null)

    // Pour les listes de description
    if (type === "description") {
      return (
        <div
          ref={ref as React.Ref<HTMLDivElement>}
          id={id}
          className={mergeClasses(
            "description-item",
            interactive && "cursor-pointer rounded p-2 hover:bg-gray-50",
            className
          )}
          role={role || (interactive ? "button" : undefined)}
          onClick={onClick}
          tabIndex={interactive ? 0 : undefined}
          onKeyDown={
            interactive
              ? e => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    onClick?.()
                  }
                }
              : undefined
          }
        >
          {value && (
            <dt className="font-semibold text-gray-900">
              <div className="flex items-start">
                {iconContent && iconPosition === "left" && (
                  <span
                    className={mergeClasses("mt-1 mr-2 shrink-0", iconColor)}
                    aria-hidden="true"
                  >
                    {iconContent}
                  </span>
                )}
                {value}
                {iconContent && iconPosition === "right" && (
                  <span
                    className={mergeClasses("mt-1 ml-2 shrink-0", iconColor)}
                    aria-hidden="true"
                  >
                    {iconContent}
                  </span>
                )}
              </div>
            </dt>
          )}
          {description && (
            <dd
              className={mergeClasses(
                "mt-1 text-gray-600",
                value ? "ml-6" : ""
              )}
            >
              {description}
            </dd>
          )}
          {!value && !description && children}
        </div>
      )
    }

    // Pour les listes ordonnées et non ordonnées
    return (
      <li
        ref={ref as React.Ref<HTMLLIElement>}
        id={id}
        className={mergeClasses(
          "list-item",
          interactive && "cursor-pointer rounded p-2 hover:bg-gray-50",
          className
        )}
        role={role}
        onClick={onClick}
        tabIndex={interactive ? 0 : undefined}
        onKeyDown={
          interactive
            ? e => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  onClick?.()
                }
              }
            : undefined
        }
      >
        <div className="flex items-start">
          {iconContent && iconPosition === "left" && (
            <span
              className={mergeClasses("mt-1 mr-2 shrink-0", iconColor)}
              aria-hidden="true"
            >
              {iconContent}
            </span>
          )}
          <span className="flex-1">{children}</span>
          {iconContent && iconPosition === "right" && (
            <span
              className={mergeClasses("mt-1 ml-2 shrink-0", iconColor)}
              aria-hidden="true"
            >
              {iconContent}
            </span>
          )}
        </div>
      </li>
    )
  }
)

ListItem.displayName = "ListItem"

// Sous-composant List.Nested (pour les sous-listes)
export interface NestedListProps extends Omit<ListProps, "nestedLevel"> {
  /** Niveau d'imbrication (géré automatiquement) */
  level?: number
}

export const NestedList = forwardRef<HTMLUListElement, NestedListProps>(
  ({ level = 1, ...props }, ref) => {
    return <ListBase {...props} nestedLevel={level} ref={ref} />
  }
)

NestedList.displayName = "NestedList"

// Maintenant créer et exporter le composant List avec les sous-composants attachés
export const List = Object.assign(ListBase, {
  Item: ListItem,
  Nested: NestedList,
} as ListComponent) as ListComponent
