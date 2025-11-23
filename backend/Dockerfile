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
# Stage 2: Production - Run the application
# ============================================================================
# Security: Use specific version tags and update regularly to patch vulnerabilities
# Check for updates: docker scout cves node:24-alpine
FROM node:24-alpine AS production

# Security & Compliance: Metadata labels for traceability and compliance
LABEL org.opencontainers.image.title="LexOrbital BackRing"
LABEL org.opencontainers.image.description="LexOrbital BackRing - Meta-Kernel backend API"
LABEL org.opencontainers.image.version="0.1.0"
LABEL org.opencontainers.image.vendor="LexOrbital"
LABEL org.opencontainers.image.licenses="MIT"
LABEL security.scanning="enabled"
LABEL compliance.rgpd="by-design"
LABEL compliance.cnil="compliant"

# Security: Set build arguments for non-root user
ARG UID=1001
ARG GID=1001

WORKDIR /app

# Security: Enable corepack for pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Security: Create non-root user
RUN addgroup -g ${GID} -S appuser && \
    adduser -S -u ${UID} -G appuser appuser

# Security: Copy only package files for production dependencies
COPY package.json pnpm-lock.yaml* ./

# Security: Install only production dependencies (no dev dependencies)
RUN pnpm install --frozen-lockfile --prefer-offline --prod && \
    # Remove unnecessary files
    rm -rf /tmp/* /var/tmp/* && \
    # Clean pnpm cache
    pnpm store prune

# Security: Copy built application from builder stage
COPY --from=builder --chown=appuser:appuser /app/dist ./dist

# Security: Create necessary directories with proper permissions
RUN mkdir -p /app/logs && \
    chown -R appuser:appuser /app && \
    chmod -R 755 /app

# Security: Switch to non-root user
USER appuser

# Security: Expose port (non-privileged port)
EXPOSE 4000

# Security: Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD node -e "require('http').get('http://localhost:4000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Security: Run application in production mode
CMD ["node", "dist/index.js"]
