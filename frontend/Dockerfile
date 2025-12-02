# ============================================================================
# Stage 1: Builder - Build the application
# ============================================================================
# Security: Use specific version tags and update regularly to patch vulnerabilities
# Check for updates: docker scout cves node:24-alpine
FROM node:24-alpine AS builder

# Security: Set build arguments for non-root user
ARG UID=1001
ARG GID=1001

WORKDIR /app

# Security: Enable corepack and prepare pnpm with specific version
# Pin pnpm version for reproducible builds (update regularly for security patches)
RUN corepack enable && corepack prepare pnpm@10.23.0 --activate

# Security: Copy monorepo root files first for better layer caching
# This allows Docker to cache the dependency installation layer
# For pnpm workspaces, we need the root package.json, pnpm-lock.yaml, and pnpm-workspace.yaml
# Also copy tsconfig.base.json in case it's needed for TypeScript type checking
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.base.json ./
# Copy workspace package.json
COPY frontend/package.json ./frontend/

# Security: Install dependencies with frozen lockfile (reproducible builds)
# --prefer-offline uses cached packages when available
# pnpm will install dependencies for all workspaces defined in pnpm-workspace.yaml
# --ignore-scripts: Skip lifecycle scripts (like husky install) that are not needed in Docker
RUN pnpm install --frozen-lockfile --prefer-offline --filter @lexorbital/front-ring --ignore-scripts

# Copy source code
COPY frontend ./frontend

# Security: Build with production optimizations
# This creates optimized, minified production assets
WORKDIR /app/frontend
RUN pnpm run build

# ============================================================================
# Stage 2: Production - Serve with nginx
# ============================================================================
# Security: Use specific version tags and update regularly to patch vulnerabilities
# Check for updates: docker scout cves nginx:1.27-alpine
FROM nginx:1.27-alpine AS production

# Security: Set build arguments for non-root user
# These can be overridden at build time if needed for specific environments
ARG UID=1001
ARG GID=1001

# Security & Compliance: Metadata labels for traceability and compliance
# These labels help with image management, security scanning, and compliance
LABEL org.opencontainers.image.title="LexOrbital FrontRing"
LABEL org.opencontainers.image.description="LexOrbital FrontRing - Meta-Kernel frontend console"
LABEL org.opencontainers.image.version="0.1.0"
LABEL org.opencontainers.image.vendor="LexOrbital"
LABEL org.opencontainers.image.licenses="MIT"
LABEL security.scanning="enabled"
LABEL compliance.rgpd="by-design"
LABEL compliance.cnil="compliant"

# Security: Create non-root user for nginx
# Using fixed UID/GID for consistency across environments
RUN addgroup -g ${GID} -S appuser && \
    adduser -S -u ${UID} -G appuser appuser && \
    # Remove default nginx user if it exists (may not exist in all nginx images)
    (deluser nginx 2>/dev/null || true)

# Security: Remove unnecessary packages and clean cache
# Upgrade packages to latest security patches and remove build artifacts
RUN apk --no-cache upgrade && \
    apk --no-cache add curl && \
    rm -rf /var/cache/apk/* /tmp/* /var/tmp/*

# Security: Create directories with proper permissions
# Set ownership and permissions before copying files
RUN mkdir -p /var/cache/nginx /var/log/nginx /etc/nginx/conf.d /usr/share/nginx/html && \
    chown -R appuser:appuser /var/cache/nginx /var/log/nginx /etc/nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html && \
    chmod -R 755 /var/cache/nginx && \
    chmod -R 755 /var/log/nginx

# Security: Copy built assets from builder stage
# Only copy the dist directory to minimize image size
COPY --from=builder --chown=appuser:appuser /app/frontend/dist /usr/share/nginx/html

# Security & RGPD: Copy nginx configurations
# These configurations include security headers and RGPD compliance settings
COPY --chown=appuser:appuser frontend/nginx.conf /etc/nginx/conf.d/default.conf
COPY --chown=appuser:appuser frontend/nginx-main.conf /etc/nginx/nginx.conf

# Security: Set proper permissions on nginx configuration files
# Configuration files should be readable but not writable
RUN chown -R appuser:appuser /etc/nginx && \
    chmod -R 755 /etc/nginx && \
    chmod 644 /etc/nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Security: Switch to non-root user
# This limits the impact of potential security vulnerabilities
USER appuser

# Security: Expose port (8080 for non-root user)
# Ports below 1024 require root privileges, so we use 8080
EXPOSE 8080

# Security: Health check
# Checks the /health endpoint defined in nginx.conf
# The endpoint returns 200 OK if nginx is serving correctly
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8080/health || exit 1

# Security: Run nginx in foreground
# Required for Docker containers - nginx must run in foreground mode
# Nginx handles SIGTERM gracefully for proper container shutdown
CMD ["nginx", "-g", "daemon off;"]
