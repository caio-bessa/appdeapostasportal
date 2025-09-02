#!/bin/bash

# Script to create missing Strapi API files
CONTENT_TYPES=("article" "author" "team" "app")
BASE_PATH="/home/ec2-user/appdeapostas/cms/appdeapostas/src/api"

for content_type in "${CONTENT_TYPES[@]}"; do
    echo "Creating files for $content_type..."
    
    # Create directories
    mkdir -p "$BASE_PATH/$content_type"/{controllers,services,routes}
    
    # Create routes file
    cat > "$BASE_PATH/$content_type/routes/$content_type.js" << EOF
'use strict';

/**
 * $content_type router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::$content_type.$content_type');
EOF

    # Create controller file
    cat > "$BASE_PATH/$content_type/controllers/$content_type.js" << EOF
'use strict';

/**
 * $content_type controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::$content_type.$content_type');
EOF

    # Create service file
    cat > "$BASE_PATH/$content_type/services/$content_type.js" << EOF
'use strict';

/**
 * $content_type service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::$content_type.$content_type');
EOF

    echo "✅ Created files for $content_type"
done

echo "🎉 All content type files created!"