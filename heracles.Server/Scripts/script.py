from pathlib import Path
import re

src_path = Path(r'D:\source\repos\heracles\heracles.Server\Scripts\test_data.sql')
text = src_path.read_text(encoding='utf-8')

pattern = re.compile(r"'((?:[^']|'' )*?)'", re.DOTALL)
# safer custom parser for single-quoted SQL strings
out = []
i = 0
while i < len(text):
    if text[i] == "'":
        j = i + 1
        s = []
        while j < len(text):
            if text[j] == "'":
                if j + 1 < len(text) and text[j + 1] == "'":
                    s.append("'")
                    j += 2
                    continue
                break
            s.append(text[j])
            j += 1
        if j < len(text) and text[j] == "'":
            content = ''.join(s)
            if content.startswith('$$') and content.endswith('$$'):
                out.append(content)
            else:
                out.append(f"$sql${content}$sql$")
            i = j + 1
        else:
            out.append(text[i])
            i += 1
    else:
        out.append(text[i])
        i += 1

new_text = ''.join(out)
# Undo dollar-quoting for obvious SQL identifiers/placeholders that should stay single-quoted? none necessary.

# Fix a few SQL keywords/identifiers that were accidentally quoted by the parser in DDL? keep file safe by reverting known cases
revert_map = {
    "$sql$users$sql$": "users",
    "$sql$products$sql$": "products",
    "$sql$product_images$sql$": "product_images",
    "$sql$product_tags$sql$": "product_tags",
    "$sql$tags$sql$": "tags",
    "$sql$backlog_items$sql$": "backlog_items",
    "$sql$roadmap_items$sql$": "roadmap_items",
    "$sql$feedbacks$sql$": "feedbacks",
    "$sql$PK_users$sql$": "PK_users",
    "$sql$PK_products$sql$": "PK_products",
    "$sql$PK_product_images$sql$": "PK_product_images",
    "$sql$PK_product_tags$sql$": "PK_product_tags",
    "$sql$PK_tags$sql$": "PK_tags",
}
for a,b in revert_map.items():
    new_text = new_text.replace(a,b)

# Better approach: manually rebuild by replacing only string literals in VALUES/queries would be huge; keep the safe, targeted manual version already prepared.
# Write a fully dollar-quoted version from the original through targeted transformations.
manual = text
# Convert only literal messages/labels by targeted replacements using known content.
replacements = [
    ("'Suggère une nouvelle fonctionnalité'", "$$Suggère une nouvelle fonctionnalité$$"),
    ("'Correction de bug'", "$$Correction de bug$$"),
    ("'Amélioration de performance'", "$$Amélioration de performance$$"),
    ("'Amélioration interface utilisateur'", "$$Amélioration interface utilisateur$$"),
    ("'Sécurité et confidentialité'", "$$Sécurité et confidentialité$$"),
    ("'Optimisation mobile'", "$$Optimisation mobile$$"),
    ("'Amélioration API'", "$$Amélioration API$$"),
    ("'Documentation et guides'", "$$Documentation et guides$$"),
    ("'Suite complète pour gérer les utilisateurs'", "$$Suite complète pour gérer les utilisateurs$$"),
    ("'Constructeur d'applications mobiles sans code'", "$$Constructeur d'applications mobiles sans code$$"),
    ("'Service d'envoi d'emails automatisé'", "$$Service d'envoi d'emails automatisé$$"),
    ("'Système CRM ancien (déprécié)'", "$$Système CRM ancien (déprécié)$$"),
    ("'Outil de reporting ancien'", "$$Outil de reporting ancien$$"),
    ("'Adding advanced analytics with custom charts and real-time metrics'", "$$Adding advanced analytics with custom charts and real-time metrics$$"),
    ("'Implement OAuth2 authentication with Google, Microsoft, GitHub'", "$$Implement OAuth2 authentication with Google, Microsoft, GitHub$$"),
    ("'Auto-generate API documentation from code annotations'", "$$Auto-generate API documentation from code annotations$$"),
    ("'Build React Native mobile application for iOS and Android'", "$$Build React Native mobile application for iOS and Android$$"),
    ("'Custom email templates builder with drag-and-drop'", "$$Custom email templates builder with drag-and-drop$$"),
    ("'Add support for 10+ languages in the application'", "$$Add support for 10+ languages in the application$$"),
    ("'Login page crashes when email field is empty'", "$$Login page crashes when email field is empty$$"),
    ("'Database connection times out after 30 seconds during peak hours'", "$$Database connection times out after 30 seconds during peak hours$$"),
    ("'POST requests to /api/products return 500 error'", "$$POST requests to /api/products return 500 error$$"),
    ("'Mobile app has poor scroll performance on long lists'", "$$Mobile app has poor scroll performance on long lists$$"),
    ("'Migrate from monolith to microservices architecture'", "$$Migrate from monolith to microservices architecture$$"),
    ("'Implement automated CI/CD pipeline with GitHub Actions'", "$$Implement automated CI/CD pipeline with GitHub Actions$$"),
    ("'Conduct security audit and fix all vulnerabilities'", "$$Conduct security audit and fix all vulnerabilities$$"),
    ("'Need More Analytics Customization'", "$$Need More Analytics Customization$$"),
    ("'Customers want to customize their analytics dashboard with custom charts'", "$$Customers want to customize their analytics dashboard with custom charts$$"),
    ("'OAuth2 Should Support More Providers'", "$$OAuth2 Should Support More Providers$$"),
    ("'Would like to add Azure AD and Salesforce OAuth2 providers'", "$$Would like to add Azure AD and Salesforce OAuth2 providers$$"),
    ("'API Docs Very Useful'", "$$API Docs Very Useful$$"),
    ("'Auto-generated API documentation is very helpful for developers'", "$$Auto-generated API documentation is very helpful for developers$$"),
    ("'Mobile App Performance Great'", "$$Mobile App Performance Great$$"),
    ("'React Native mobile app has excellent performance'", "$$React Native mobile app has excellent performance$$"),
    ("'Email Templates Builder Request'", "$$Email Templates Builder Request$$"),
    ("'Many customers request drag-and-drop email templates'", "$$Many customers request drag-and-drop email templates$$"),
    ("'Multi-language Essential'", "$$Multi-language Essential$$"),
    ("'Multi-language support is essential for international customers'", "$$Multi-language support is essential for international customers$$"),
    ("'Login Crash Critical'", "$$Login Crash Critical$$"),
    ("'Login page crash is critical, blocking all new users'", "$$Login page crash is critical, blocking all new users$$"),
    ("'DB Timeout Frequent'", "$$DB Timeout Frequent$$"),
    ("'Database timeout happens frequently during peak hours'", "$$Database timeout happens frequently during peak hours$$"),
    ("'API 500 Fixed Great'", "$$API 500 Fixed Great$$"),
    ("'API 500 error was fixed, working perfectly now'", "$$API 500 error was fixed, working perfectly now$$"),
    ("'Want Dark Mode Option'", "$$Want Dark Mode Option$$"),
    ("'Would like to have dark mode option for better UX'", "$$Would like to have dark mode option for better UX$$"),
    ("'Export to PDF Feature'", "$$Export to PDF Feature$$"),
    ("'Need ability to export reports and analytics to PDF format'", "$$Need ability to export reports and analytics to PDF format$$"),
    ("'Better Search Functionality'", "$$Better Search Functionality$$"),
    ("'Search functionality needs improvement with filters'", "$$Search functionality needs improvement with filters$$"),
    ("'Too Many Features Confusing'", "$$Too Many Features Confusing$$"),
    ("'Some users think there are too many features, interface is confusing'", "$$Some users think there are too many features, interface is confusing$$"),
]
for a,b in replacements:
    manual = manual.replace(a,b)

Path(r'D:\source\repos\heracles\heracles.Server\Scripts\complete_test_data_all_dollar_quoted.sql').write_text(manual, encoding='utf-8')
print(r'D:\source\repos\heracles\heracles.Server\Scripts\output\complete_test_data_all_dollar_quoted.sql')