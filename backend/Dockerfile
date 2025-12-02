# ============================================================================
# Stage 1: Builder - Build the application
# ============================================================================
# Security: Use specific version tags and update regularly to patch vulnerabilities
# Check for updates: docker scout cves node:24-alpine
FROM node:24-alpine AS builder

WORKDIR /app

# Security: Enable corepack and prepare pnpm with specific version
# Pin pnpm version for reproducible builds (update regularly for security patches)
RUN corepack enable && corepack prepare pnpm@10.23.0 --activate

# Security: Copy monorepo root files first for better layer caching
# This allows Docker to cache the dependency installation layer
# For pnpm workspaces, we need the root package.json, pnpm-lock.yaml, and pnpm-workspace.yaml
# Also copy tsconfig.base.json which is required for TypeScript compilation
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.base.json ./
# Copy workspace package.json
COPY backend/package.json ./backend/

# Security: Install dependencies with frozen lockfile (reproducible builds)
# --prefer-offline uses cached packages when available
# pnpm will install dependencies for all workspaces defined in pnpm-workspace.yaml
# Note: We need devDependencies for building, so we don't use --prod here
# --ignore-scripts: Skip lifecycle scripts (like husky install) that are not needed in Docker
RUN pnpm install --frozen-lockfile --prefer-offline --filter @lexorbital/back-ring --ignore-scripts

# Copy source code
COPY backend ./backend

# Security: Build with production optimizations
# This creates optimized, transpiled production code
WORKDIR /app/backend
RUN pnpm run build

# ============================================================================
# Stage 2: Production - Run the application
# ============================================================================
# Security: Use specific version tags and update regularly to patch vulnerabilities
# Check for updates: docker scout cves node:24-alpine
FROM node:24-alpine AS production

# Security & Compliance: Metadata labels for traceability and compliance
# These labels help with image management, security scanning, and compliance
LABEL org.opencontainers.image.title="LexOrbital BackRing"
LABEL org.opencontainers.image.description="LexOrbital BackRing - Meta-Kernel backend API"
LABEL org.opencontainers.image.version="0.1.0"
LABEL org.opencontainers.image.vendor="LexOrbital"
LABEL org.opencontainers.image.licenses="MIT"
LABEL security.scanning="enabled"
LABEL compliance.rgpd="by-design"
LABEL compliance.cnil="compliant"

# Security: Set build arguments for non-root user
# These can be overridden at build time if needed for specific environments
ARG UID=1001
ARG GID=1001

WORKDIR /app

# Security: Enable corepack for pnpm with specific version
# Pin pnpm version for reproducible builds
RUN corepack enable && corepack prepare pnpm@10.23.0 --activate

# Security: Create non-root user
# Using ARG variables allows customization while maintaining security
RUN addgroup -g ${GID} -S appuser && \
    adduser -S -u ${UID} -G appuser appuser

# Security: Copy monorepo root files for production dependencies
# This allows Docker to cache the production dependency installation layer
# For pnpm workspaces, we need the root package.json, pnpm-lock.yaml, and pnpm-workspace.yaml
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
# Copy workspace package.json
COPY backend/package.json ./backend/

# Security: Install only production dependencies (no dev dependencies)
# This reduces image size and attack surface
# Install curl for health checks
# Clean up temporary files and pnpm cache to minimize image size
# Use --filter to install only backend workspace dependencies
# --ignore-scripts: Skip lifecycle scripts (like husky install) that are not needed in Docker
RUN apk --no-cache add curl && \
    pnpm install --frozen-lockfile --prefer-offline --filter @lexorbital/back-ring --prod --ignore-scripts && \
    # Remove unnecessary files
    rm -rf /tmp/* /var/tmp/* && \
    # Clean pnpm cache to reduce image size
    pnpm store prune

# Security: Copy built application from builder stage
# Only copy the dist directory containing the compiled application
COPY --from=builder --chown=appuser:appuser /app/backend/dist ./backend/dist

# Change to backend directory for CMD
WORKDIR /app/backend

# Security: Create necessary directories with proper permissions
# Logs directory for application logging
RUN mkdir -p /app/logs && \
    chown -R appuser:appuser /app && \
    chmod -R 755 /app

# Security: Switch to non-root user
# This limits the impact of potential security vulnerabilities
USER appuser

# Security: Expose port (non-privileged port)
# Ports below 1024 require root privileges, so we use 4000
EXPOSE 4000

# Security: Health check
# Uses curl to check the /health endpoint
# The application should implement a /health endpoint that returns 200 OK
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD curl -f http://localhost:4000/health || exit 1

# Security: Run application in production mode
# The application should handle SIGTERM gracefully for proper container shutdown
# Ensure your Node.js application listens for SIGTERM and shuts down cleanly
CMD ["node", "dist/index.js"]
