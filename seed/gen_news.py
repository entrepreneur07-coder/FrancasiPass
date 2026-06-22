import uuid
from datetime import datetime

def generate_news():
    articles = [
        {
            "title": "Le Canada augmente ses cibles d'immigration francophone",
            "content": "Le gouvernement canadien a annoncé aujourd'hui une augmentation significative de ses cibles pour l'immigration francophone hors Québec. Cette mesure vise à renforcer la vitalité des communautés de langue officielle en situation minoritaire à travers le pays. Le ministre de l'Immigration a souligné que les nouveaux arrivants francophones apportent des compétences essentielles et contribuent à la diversité culturelle du Canada.",
            "summary": "Le Canada vise à attirer plus d'immigrants francophones hors Québec.",
            "source_url": "https://www.canada.ca/news",
            "difficulty_level": "b1"
        },
        {
            "title": "Les avantages de la double citoyenneté",
            "content": "Avoir deux passeports offre de nombreux avantages, notamment la liberté de mouvement et plus d'opportunités professionnelles. Cependant, cela implique aussi des responsabilités, comme le respect des lois des deux pays. Beaucoup d'immigrants au Canada choisissent de conserver leur nationalité d'origine tout en devenant citoyens canadiens pour maintenir un lien avec leurs racines.",
            "summary": "La double citoyenneté offre des avantages pratiques et sentimentaux.",
            "source_url": "https://www.immigrant-magazine.ca",
            "difficulty_level": "a2"
        },
        {
            "title": "L'importance du TEF pour Entrée Express",
            "content": "Le Test d'Évaluation de Français (TEF) est un outil crucial pour les candidats à l'immigration via le système Entrée Express. Un score élevé peut rapporter jusqu'à 50 points supplémentaires dans le Système de classement global (SCG). Les experts recommandent une préparation intensive d'au moins trois mois pour maximiser ses chances de réussite et obtenir une invitation à présenter une demande de résidence permanente.",
            "summary": "Le TEF peut augmenter significativement vos points CRS.",
            "source_url": "https://www.francaispass.com/blog",
            "difficulty_level": "b2"
        },
        {
            "title": "La culture du café à Montréal",
            "content": "Montréal est célèbre pour ses nombreux cafés indépendants où les gens se retrouvent pour discuter ou travailler. Contrairement à la France, où le café se boit souvent debout au comptoir, les Montréalais préfèrent s'installer confortablement pendant des heures. Cette culture reflète le mélange unique d'influences européennes et nord-américaines qui caractérise la métropole québécoise.",
            "summary": "Une exploration de la culture sociale des cafés à Montréal.",
            "source_url": "https://www.mtl-blog.com",
            "difficulty_level": "a1"
        },
        {
            "title": "Les nouveaux défis du marché du travail canadien",
            "content": "Avec le vieillissement de la population, le Canada fait face à des pénuries de main-d'œuvre dans plusieurs secteurs clés comme la santé et la technologie. Le gouvernement encourage les employeurs à recruter des talents internationaux qualifiés. Pour les nouveaux arrivants, la maîtrise de l'anglais et du français reste un atout majeur pour décrocher des postes à haute responsabilité.",
            "summary": "Pénurie de main-d'œuvre et opportunités pour les immigrés qualifiés.",
            "source_url": "https://www.radio-canada.ca/economie",
            "difficulty_level": "c1"
        },
        {
            "title": "Apprendre le français en ligne : conseils et astuces",
            "content": "L'apprentissage d'une langue étrangère demande de la régularité. Avec l'avènement des plateformes numériques, il est désormais possible de pratiquer quotidiennement avec des tuteurs natifs ou des applications mobiles. Les spécialistes suggèrent de varier les supports : podcasts, films sous-titrés et exercices de grammaire interactifs pour ne pas se lasser et progresser rapidement.",
            "summary": "Conseils pour progresser en français grâce aux outils numériques.",
            "source_url": "https://www.le-monde-fle.fr",
            "difficulty_level": "b1"
        },
        {
            "title": "Le festival d'été de Québec attire les foules",
            "content": "Chaque année en juillet, la ville de Québec vibre au rythme de son festival d'été. Des artistes internationaux et locaux se produisent sur les Plaines d'Abraham devant des milliers de spectateurs. C'est l'un des événements culturels les plus importants au pays, attirant des touristes du monde entier et générant des retombées économiques majeures pour la région.",
            "summary": "Le succès continu d'un grand festival de musique au Québec.",
            "source_url": "https://www.quebec-cite.com",
            "difficulty_level": "a2"
        },
        {
            "title": "Réussir son intégration professionnelle au Canada",
            "content": "Trouver un emploi dans son domaine d'expertise est une priorité pour de nombreux immigrants. Le réseautage est souvent la clé du succès au Canada. Il est conseillé de participer à des salons de l'emploi et de contacter des mentors. L'adaptation du CV au format canadien et la préparation aux entrevues comportementales sont également des étapes essentielles.",
            "summary": "L'importance du réseautage pour la carrière des nouveaux arrivants.",
            "source_url": "https://www.emplois-canada.ca",
            "difficulty_level": "b2"
        },
        {
            "title": "Le système de santé canadien expliqué",
            "content": "Le Canada dispose d'un système de santé financé par l'État qui offre des soins gratuits à tous ses résidents permanents et citoyens. Chaque province gère son propre régime d'assurance maladie. Bien que les délais d'attente puissent parfois être longs pour certains spécialistes, la qualité des soins d'urgence est mondialement reconnue comme étant excellente.",
            "summary": "Fonctionnement et principes de base de l'assurance maladie canadienne.",
            "source_url": "https://www.canada-health.ca",
            "difficulty_level": "b1"
        },
        {
            "title": "Les fêtes de fin d'année au Canada",
            "content": "Au Canada, les traditions de Noël et du Nouvel An sont très ancrées. On décore souvent les maisons avec de nombreuses lumières et un sapin naturel. La neige, souvent présente à cette période, ajoute une touche magique aux célébrations. C'est un moment privilégié pour se retrouver en famille autour d'un grand repas traditionnel composé de dinde et de tourtière.",
            "summary": "Découverte des traditions hivernales et familiales au Canada.",
            "source_url": "https://www.vivre-au-canada.com",
            "difficulty_level": "a1"
        }
    ]
    
    for article in articles:
        article["id"] = str(uuid.uuid4())
        article["published_at"] = datetime.now().isoformat()
        article["created_at"] = datetime.now().isoformat()
        article["image_url"] = f"https://source.unsplash.com/featured/?{article['title'].split()[0]}"

    return articles

def generate_sql(table, data):
    if not data:
        return ""
    
    columns = data[0].keys()
    sql = f"INSERT INTO {table} ({', '.join(columns)})\nVALUES\n"
    
    values = []
    for row in data:
        row_values = []
        for col in columns:
            val = row[col]
            if val is None:
                row_values.append("NULL")
            elif isinstance(val, str):
                safe_val = val.replace("'", "''")
                row_values.append(f"'{safe_val}'")
            else:
                row_values.append(str(val))
        values.append(f"({', '.join(row_values)})")
    
    sql += ",\n".join(values) + ";"
    return sql

def main():
    news = generate_news()
    sql_content = generate_sql("public.news_articles", news)
    with open("/home/team/shared/francaispass/seed/news_articles.sql", "w") as f:
        f.write(sql_content)
    print(f"Generated {len(news)} news articles.")

if __name__ == "__main__":
    main()
