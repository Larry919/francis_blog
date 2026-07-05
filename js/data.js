const papers = [
  {
    id: 'paper-1',
    title: 'Attention Is All You Need',
    authors: ['Ashish Vaswani', 'Noam Shazeer', 'Niki Parmar', 'Jakob Uszkoreit', 'et al.'],
    venue: 'NeurIPS',
    year: 2017,
    tags: ['Transformer', 'Attention', 'NLP'],
    thumbnail: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=transformer%20architecture%20diagram%20neural%20network%20attention%20mechanism%20academic%20illustration&image_size=landscape_4_3',
    abstract: 'The dominant sequence transduction models are based on complex recurrent or convolutional neural networks that include an encoder and a decoder. We propose a new simple network architecture, the Transformer, based solely on attention mechanisms, dispensing with recurrence and convolutions entirely.',
    contributions: [
      'Proposed the Transformer architecture relying entirely on self-attention mechanisms',
      'Achieved state-of-the-art results on WMT 2014 English-to-German and English-to-French translation tasks',
      'Enabled significantly more parallelization and faster training compared to RNNs',
      'Introduced multi-head attention and positional encoding concepts'
    ],
    keyFigures: [
      {
        id: 'fig1',
        caption: 'Figure 1: The Transformer - Model Architecture',
        imagePath: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=transformer%20model%20architecture%20encoder%20decoder%20multi-head%20attention%20diagram%20academic%20paper%20style&image_size=portrait_4_3',
        cropArea: { x: 0, y: 0, width: 100, height: 100 },
        explanation: 'The Transformer uses stacked self-attention and point-wise, fully connected layers for both the encoder and decoder. The encoder maps an input sequence of symbol representations to a sequence of continuous representations, while the decoder generates an output sequence one element at a time.'
      },
      {
        id: 'fig2',
        caption: 'Figure 2: Scaled Dot-Product Attention and Multi-Head Attention',
        imagePath: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=scaled%20dot%20product%20attention%20multi-head%20attention%20mechanism%20diagram%20vectors%20keys%20queries%20values&image_size=landscape_4_3',
        cropArea: { x: 0, y: 0, width: 100, height: 100 },
        explanation: 'Multi-head attention allows the model to jointly attend to information from different representation subspaces at different positions. The attention function maps a query and a set of key-value pairs to an output, computed as a weighted sum of the values.'
      }
    ],
    methods: [
      {
        section: 'Scaled Dot-Product Attention',
        content: 'The attention function can be described as mapping a query and a set of key-value pairs to an output. The output is computed as a weighted sum of the values, where the weight assigned to each value is computed by a compatibility function of the query with the corresponding key. We use dot-product attention scaled by 1/√d_k.'
      },
      {
        section: 'Multi-Head Attention',
        content: 'Instead of performing a single attention function with d_model-dimensional keys, values, and queries, we found it beneficial to linearly project the queries, keys, and values h times with different, learned linear projections to d_k, d_k, and d_v dimensions respectively. On each of these projected versions, we then perform the attention function in parallel, yielding d_v-dimensional output values.'
      },
      {
        section: 'Positional Encoding',
        content: 'Since our model contains no recurrence and no convolution, we must inject some information about the relative or absolute position of the tokens in the sequence. We add positional encodings to the input embeddings at the bottoms of the encoder and decoder stacks.'
      }
    ],
    pdfLink: 'https://arxiv.org/abs/1706.03762',
    codeLink: 'https://github.com/tensorflow/tensor2tensor'
  },
  {
    id: 'paper-2',
    title: 'BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding',
    authors: ['Jacob Devlin', 'Ming-Wei Chang', 'Kenton Lee', 'Kristina Toutanova'],
    venue: 'NAACL',
    year: 2019,
    tags: ['BERT', 'Pre-training', 'NLP', 'Transformer'],
    thumbnail: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=BERT%20bidirectional%20encoder%20representations%20transformers%20masked%20language%20model%20diagram&image_size=landscape_4_3',
    abstract: 'We introduce a new language representation model called BERT, which stands for Bidirectional Encoder Representations from Transformers. BERT is designed to pre-train deep bidirectional representations from unlabeled text by jointly conditioning on both left and right context in all layers.',
    contributions: [
      'Introduced bidirectional pre-training for language representations',
      'Proposed Masked Language Model (MLM) and Next Sentence Prediction (NSP) pre-training tasks',
      'Achieved state-of-the-art results on 11 NLP tasks',
      'Demonstrated that pre-trained representations can be fine-tuned for diverse tasks with minimal task-specific modifications'
    ],
    keyFigures: [
      {
        id: 'fig1',
        caption: 'Figure 1: BERT Pre-training and Fine-tuning Architecture',
        imagePath: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=BERT%20pre-training%20fine-tuning%20architecture%20diagram%20masked%20LM%20next%20sentence%20prediction%20transformer%20layers&image_size=landscape_16_9',
        cropArea: { x: 0, y: 0, width: 100, height: 100 },
        explanation: 'BERT uses a multi-layer Transformer encoder. During pre-training, the model is trained on unlabeled data using two unsupervised tasks: Masked LM and Next Sentence Prediction. For fine-tuning, the BERT model is initialized with the pre-trained parameters, and all parameters are fine-tuned using labeled data from downstream tasks.'
      }
    ],
    methods: [
      {
        section: 'Masked Language Model (MLM)',
        content: 'We randomly mask some percentage of the input tokens, and then predict those masked tokens. This task allows the representation to fuse the left and the right context, which allows us to pre-train a deep bidirectional Transformer.'
      },
      {
        section: 'Next Sentence Prediction (NSP)',
        content: 'In order to train a model that understands sentence relationships, we pre-train for a binarized next sentence prediction task that can be trivially generated from any monolingual corpus. When choosing the sentences A and B for each pre-training example, 50% of the time B is the actual next sentence and 50% of the time it is a random sentence.'
      }
    ],
    pdfLink: 'https://arxiv.org/abs/1810.04805',
    codeLink: 'https://github.com/google-research/bert'
  },
  {
    id: 'paper-3',
    title: 'Denoising Diffusion Probabilistic Models',
    authors: ['Jonathan Ho', 'Ajay Jain', 'Pieter Abbeel'],
    venue: 'NeurIPS',
    year: 2020,
    tags: ['Diffusion', 'Generative Models', 'Image Synthesis'],
    thumbnail: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=diffusion%20models%20forward%20reverse%20process%20noise%20generation%20synthesis%20diagram%20academic&image_size=landscape_4_3',
    abstract: 'We present high quality image synthesis results using diffusion probabilistic models, a class of latent variable models inspired by considerations from nonequilibrium thermodynamics. Our best results are obtained by training on a weighted variational bound designed according to a novel connection between diffusion probabilistic models and denoising score matching with Langevin dynamics.',
    contributions: [
      'Proposed a simplified diffusion model training objective that achieves state-of-the-art image quality',
      'Established connection between diffusion models and denoising score matching with Langevin dynamics',
      'Demonstrated high-fidelity image synthesis on CIFAR10 and LSUN datasets',
      'Introduced the DDPM (Denoising Diffusion Probabilistic Models) framework that became foundational for modern generative AI'
    ],
    keyFigures: [
      {
        id: 'fig1',
        caption: 'Figure 1: The directed graphical model considered in this work',
        imagePath: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=diffusion%20forward%20process%20reverse%20process%20markov%20chain%20noise%20schedule%20denoising%20steps%20diagram&image_size=landscape_16_9',
        cropArea: { x: 0, y: 0, width: 100, height: 100 },
        explanation: 'The forward process gradually adds Gaussian noise to the data over T steps. The reverse process learns to reverse this noising process using a neural network to predict the noise at each step, starting from pure noise to generate new data samples.'
      },
      {
        id: 'fig2',
        caption: 'Figure 2: Generated samples on CIFAR-10',
        imagePath: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=CIFAR10%20generated%20images%20diffusion%20model%20samples%20high%20quality%20synthetic%20images%20grid&image_size=square_hd',
        cropArea: { x: 0, y: 0, width: 100, height: 100 },
        explanation: 'The samples generated by DDPM demonstrate high quality and diversity, achieving competitive FID scores compared to GAN-based models while providing more stable training dynamics.'
      }
    ],
    methods: [
      {
        section: 'Forward Diffusion Process',
        content: 'The forward process is a fixed Markov chain that gradually adds Gaussian noise to the data according to a variance schedule β₁...β_T. Given a data point x₀ sampled from the real data distribution, we produce latent samples x₁,...,x_T by adding noise at each step.'
      },
      {
        section: 'Reverse Diffusion Process',
        content: 'The reverse process is defined as a Markov chain with learned Gaussian transitions starting at p(x_T) = N(x_T; 0, I). We train a neural network to predict the mean and variance of these reverse transitions, allowing us to sample new data by iteratively denoising.'
      },
      {
        section: 'Simplified Training Objective',
        content: 'We propose a simplified objective that directly predicts the noise component ε rather than the original data. This simple reparameterization leads to significantly better sample quality and more stable training compared to the original variational bound objective.'
      }
    ],
    pdfLink: 'https://arxiv.org/abs/2006.11239',
    codeLink: 'https://github.com/hojonathanho/diffusion'
  }
];

const blogPosts = [
  {
    id: 'blog-1',
    title: '从零开始理解 Transformer 架构',
    date: '2024-01-15',
    category: '深度学习',
    tags: ['Transformer', 'Attention', 'NLP'],
    excerpt: '本文将带你从零开始理解 Transformer 的核心思想，包括自注意力机制、多头注意力、位置编码等关键概念，配合直观的图解帮助你彻底搞懂这个改变了 AI 领域的重要架构。',
    readTime: 15,
    coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=transformer%20architecture%20deep%20learning%20tutorial%20educational%20diagram%20colorful&image_size=landscape_4_3'
  },
  {
    id: 'blog-2',
    title: '扩散模型原理与代码实现',
    date: '2024-02-20',
    category: '生成模型',
    tags: ['Diffusion', 'Generative AI', 'PyTorch'],
    excerpt: '扩散模型是当前图像生成领域的主流技术，本文详细解析 DDPM 的数学原理，并提供一份可运行的 PyTorch 最简实现，帮助你快速上手扩散模型。',
    readTime: 20,
    coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=diffusion%20models%20code%20implementation%20pytorch%20tutorial%20noise%20generation%20visualization&image_size=landscape_4_3'
  },
  {
    id: 'blog-3',
    title: '我的学术之路：从入门到顶会发表',
    date: '2024-03-10',
    category: '随笔',
    tags: ['学术', '经验分享', '研究生'],
    excerpt: '分享我在 AI 研究路上的一些经验和感悟，包括如何读论文、找选题、做实验、写论文等，希望对刚入门的同学有所帮助。',
    readTime: 10,
    coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=academic%20research%20journey%20student%20studying%20library%20warm%20lighting%20inspirational&image_size=landscape_4_3'
  }
];

const siteConfig = {
  author: 'Francis',
  title: "Francis's Academic Blog",
  description: '探索 AI 前沿，深度解读论文，分享技术思考',
  avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20portrait%20young%20researcher%20minimalist%20style%20dark%20blue%20background%20elegant&image_size=square',
  github: 'https://github.com/larry919',
  email: 'francis@example.com'
};
