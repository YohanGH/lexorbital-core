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

# Security: Enable corepack and prepare pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Security: Copy only package files first for better layer caching
COPY package.json pnpm-lock.yaml* ./

# Security: Install dependencies with frozen lockfile (reproducible builds)
RUN pnpm install --frozen-lockfile --prefer-offline

# Copy source code
COPY . .

# Security: Build with production optimizations
RUN pnpm run build

# ============================================================================
# Stage 2: Production - Serve with nginx
# ============================================================================
# Security: Use specific version tags and update regularly to patch vulnerabilities
# Check for updates: docker scout cves nginx:1.27-alpine
FROM nginx:1.27-alpine AS production

# Security & Compliance: Metadata labels for traceability and compliance
LABEL org.opencontainers.image.title="LexOrbital FrontRing"
LABEL org.opencontainers.image.description="LexOrbital FrontRing - Meta-Kernel frontend console"
LABEL org.opencontainers.image.version="0.1.0"
LABEL org.opencontainers.image.vendor="LexOrbital"
LABEL org.opencontainers.image.licenses="MIT"
LABEL security.scanning="enabled"
LABEL compliance.rgpd="by-design"
LABEL compliance.cnil="compliant"

# Security: Create non-root user for nginx
RUN addgroup -g 1001 -S appuser && \
    adduser -S -u 1001 -G appuser appuser && \
    # Remove default nginx user
    deluser nginx || true

# Security: Remove unnecessary packages and clean cache
RUN apk --no-cache upgrade && \
    apk --no-cache add curl && \
    rm -rf /var/cache/apk/* /tmp/* /var/tmp/*

# Security: Create directories with proper permissions
RUN mkdir -p /var/cache/nginx /var/log/nginx /etc/nginx/conf.d /usr/share/nginx/html && \
    chown -R appuser:appuser /var/cache/nginx /var/log/nginx /etc/nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html && \
    chmod -R 755 /var/cache/nginx && \
    chmod -R 755 /var/log/nginx

# Security: Copy built assets from builder
COPY --from=builder --chown=appuser:appuser /app/dist /usr/share/nginx/html

# Security & RGPD: Copy nginx configurations
COPY --chown=appuser:appuser nginx.conf /etc/nginx/conf.d/default.conf
COPY --chown=appuser:appuser nginx-main.conf /etc/nginx/nginx.conf

# Security: Set proper permissions
RUN chown -R appuser:appuser /etc/nginx && \
    chmod -R 755 /etc/nginx && \
    chmod 644 /etc/nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Security: Switch to non-root user
USER appuser

# Security: Expose port (8080 for non-root user)
EXPOSE 8080

# Security: Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8080/health || exit 1

# Security: Run nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
